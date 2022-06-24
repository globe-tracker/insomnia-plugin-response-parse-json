# insomnia-plugin-response-parse-json

This is a plugin for Insomnia API client.

## Installation

Install ``insomnia-plugin-response-parse-json`` plugin from Preferences > Plugins.

## Usage

Add a header `INSOMNIA-RESPONSE-JSON-PARSE` with value of a jsonpath query for the items you want to parse.

## Example

### Response before plugin

```json
{
    "data": {
        "getEvents": {
            "totalReceived": 2,
            "lastEventId": "68b7aca2-f3a4-11ec-b845-db3a2649243b",
            "cursor": "001200106701e64ff3a411ec923f672144f0d6f5f07ffffff5f07ffffff5",
            "events": [
                {
                    "payload": "{\"uniqueId\":1,\"timestamp\":\"2022-06-24T09:59:56.000Z\",\"records\":[{\"index\":0,\"payload\":{\"type\":255,\"record_name\":\"ServerOemRawData\",\"record_version\":0,\"sub_type\":100,\"compression_type\":1,\"device_type\":3,\"when_captured\":\"2022-06-24T09:59:17.000Z\",\"raw_data_format\":1,\"raw_data\":\"rawdata\"}}],\"keyIndex\":1,\"mac\":\"mac==\"}",
                    "metadata": {
                        "boxId": "1",
                        "whenReceived": "2022-06-24T09:59:56.968737Z",
                        "whenSent": "2022-06-24T09:59:56Z"
                    }
                },
                {
                    "payload": "{\"uniqueId\":2,\"timestamp\":\"2022-06-24T09:59:57.000Z\",\"records\":[{\"index\":0,\"payload\":{\"type\":64,\"record_name\":\"Location3\",\"record_version\":0,\"gps_time\":\"2022-06-24T09:58:32.000Z\",\"gps_lat\":53.626463,\"gps_long\":-0.203157,\"gps_alt\":29,\"gps_speed\":0,\"gps_heading\":0,\"gps_sats_seen\":15,\"gps_sats_used\":8,\"gps_fix_status\":4,\"gps_hdop_quality\":0.7,\"gps_pdop_quality\":0.0,\"gps_vdop_quality\":0.0}},{\"index\":1,\"payload\":{\"type\":63,\"record_name\":\"InternalSensor3\",\"record_version\":0,\"when_captured\":\"2022-06-24T09:59:54.000Z\",\"sensor_values\":[{\"temperature\":21.34}]}}],\"keyIndex\":1,\"mac\":\"jQxCKA==\"}",
                    "metadata": {
                        "boxId": "2",
                        "whenReceived": "2022-06-24T09:59:57.787343Z",
                        "whenSent": "2022-06-24T09:59:57Z"
                    }
                }
            ]
        }
    }
}
```

Add header and jsonpath

```
INSOMNIA-RESPONSE-JSON-PARSE: data.getEvents.events[*].payload
```


```json
{
    "data": {
        "getEvents": {
            "totalReceived": 2,
            "lastEventId": "68b7aca2-f3a4-11ec-b845-db3a2649243b",
            "cursor": "001200106701e64ff3a411ec923f672144f0d6f5f07ffffff5f07ffffff5",
            "events": [
                {
                    "payload": {
                        "uniqueId": 1,
                        "timestamp": "2022-06-24T09:59:56.000Z",
                        "records": [
                            {
                                "index": 0,
                                "payload": {
                                    "type": 255,
                                    "record_name": "ServerOemRawData",
                                    "record_version": 0,
                                    "sub_type": 100,
                                    "compression_type": 1,
                                    "device_type": 3,
                                    "when_captured": "2022-06-24T09:59:17.000Z",
                                    "raw_data_format": 1,
                                    "raw_data": "rawdata"
                                }
                            }
                        ],
                        "keyIndex": 1,
                        "mac": "mac=="
                    },
                    "metadata": {
                        "boxId": "1",
                        "whenReceived": "2022-06-24T09:59:56.968737Z",
                        "whenSent": "2022-06-24T09:59:56Z"
                    }
                },
                {
                    "payload": {
                        "uniqueId": 2,
                        "timestamp": "2022-06-24T09:59:57.000Z",
                        "records": [
                            {
                                "index": 0,
                                "payload": {
                                    "type": 64,
                                    "record_name": "Location3",
                                    "record_version": 0,
                                    "gps_time": "2022-06-24T09:58:32.000Z",
                                    "gps_lat": 53.626463,
                                    "gps_long": -0.203157,
                                    "gps_alt": 29,
                                    "gps_speed": 0,
                                    "gps_heading": 0,
                                    "gps_sats_seen": 15,
                                    "gps_sats_used": 8,
                                    "gps_fix_status": 4,
                                    "gps_hdop_quality": 0.7,
                                    "gps_pdop_quality": 0,
                                    "gps_vdop_quality": 0
                                }
                            },
                            {
                                "index": 1,
                                "payload": {
                                    "type": 63,
                                    "record_name": "InternalSensor3",
                                    "record_version": 0,
                                    "when_captured": "2022-06-24T09:59:54.000Z",
                                    "sensor_values": [
                                        {
                                            "temperature": 21.34
                                        }
                                    ]
                                }
                            }
                        ],
                        "keyIndex": 1,
                        "mac": "jQxCKA=="
                    },
                    "metadata": {
                        "boxId": "2",
                        "whenReceived": "2022-06-24T09:59:57.787343Z",
                        "whenSent": "2022-06-24T09:59:57Z"
                    }
                }
            ]
        }
    }
}
```

