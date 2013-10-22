{
    "configurationSettings": [{
        "category": "<b>Choose template theme</b>",
        "fields": [{
            "placeHolder": "Defaults to map owner",
            "label": "Owner Text:",
            "fieldName": "owner",
            "type": "string",
            "tooltip": "Defaults to map owner"
        }, {
            "type": "string",
            "fieldName": "theme",
            "tooltip": "Color theme to use",
            "label": "Color Scheme:",
            "options": [{
                "label": "Chrome",
                "value": "chrome"
            }, {
                "label": "Seaside",
                "value": "seaside"
            }, {
                "label": "Pavement",
                "value": "pavement"
            }]
        }]
    },
        {
            "category": "<b>Authentication details</b>",
            "fields": [
                {
                    "placeHolder": "example appid",
                    "label": "OAuth AppID:",
                    "fieldName": "oauthappid",
                    "type": "string",
                    "tooltip": "The AppID provided to you"
                },
                {
                    "type": "boolean",
                    "fieldName": "useapplogin",
                    "label": "Use App Login",
                    "tooltip": "Check to allow user not known to AGOL to access this app "
                }
            ]
        }],
    "values": {"useapplogin": false}
}
