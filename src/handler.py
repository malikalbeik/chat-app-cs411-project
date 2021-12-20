import os
from datetime import datetime
import json
import boto3

from boto3.dynamodb.conditions import Key

client = boto3.client(
    "apigatewaymanagementapi",
    endpoint_url=os.environ["ENDPOINT"],
)
dynamodb = boto3.resource("dynamodb")
dbtable = dynamodb.Table("ChatAppTest")
buffer_table = dynamodb.Table("ChatAppTestBuffer")



def lambda_handler(event, context):
    print(f"the event is: {event}")
    connection_id = event["requestContext"]["connectionId"]
    routeKey = event["requestContext"]["routeKey"]

    if routeKey == "$connect":
        item_to_insert = {"connection_id": connection_id}
        dbtable.put_item(Item=item_to_insert)
    elif routeKey == "$disconnect":
        item_to_delete = {"connection_id": connection_id}
        dbtable.delete_item(Key=item_to_delete)
    elif routeKey == "SetName":
        connection_name = json.loads(event["body"]).get("Name")
        item_to_insert = {"connection_id": connection_id, "name": connection_name}
        dbtable.put_item(Item=item_to_insert)
        # now check if there is any messages waiting to be recieved
        response = buffer_table.query(KeyConditionExpression=Key("reciever_name").eq(connection_name))
        if response["Items"]:
            for item in response["Items"]:
                message_body = {"from": item["from"], "MessageBody": item["MessageBody"]}
                client.post_to_connection(ConnectionId=connection_id, Data=json.dumps(message_body))
                buffer_table.delete_item(Key={"reciever_name": item["reciever_name"], "epoch":item["epoch"] })
    elif routeKey == "SendMessage":
        # get current user's name
        response = dbtable.get_item(Key={"connection_id": connection_id})
        if "name" not in response["Item"]:
            client.post_to_connection(ConnectionId=connection_id, Data=json.dumps({"Error": f"you need to set your name before sendinng messages"}))
            return {"statusCode": 200}
        sender_name = response["Item"]["name"]

        message_receiver = json.loads(event["body"]).get("to")
        response = dbtable.query(IndexName="name-index",KeyConditionExpression=Key("name").eq(message_receiver))
        if response["Items"]:
            receiver_connection_id = response["Items"][0]["connection_id"]
            message_body = json.dumps({"from": sender_name, "MessageBody": json.loads(event["body"]).get("MessageBody"), "time": json.loads(event["body"]).get("time")})
            client.post_to_connection(ConnectionId=receiver_connection_id, Data=message_body)
        else:
            # buffer the messages for when the user connects again
            epoch = (datetime.now() - datetime.utcfromtimestamp(0)).total_seconds() * 1000.0
            buffered_message = {"reciever_name": message_receiver, "epoch": int(epoch), "MessageBody": json.loads(event["body"]).get("MessageBody"), "from": sender_name}
            buffer_table.put_item(Item=buffered_message)


    return {"statusCode": 200}