define([
    "dojo/ready", 
    "dojo/_base/declare",
    "dojo/_base/lang",
    "application/OAuthHelper",
    "esri/dijit/Directions",
    "esri/request"
],
function(
    ready, 
    declare,  
    lang,
    OAuthHelper,
    Directions,
    esriRequest
) { 
    return declare("", null , {
        config: {},
        constructor: function(config, div) {
            //config will contain application and user defined info for the template such as i18n strings, the web map id
            // and application id
            // any url parameters and any application specific configuration information. 
            this.config = config;
            this.div = div;
            ready(lang.hitch(this, function() {
                //this._createDirections();
                this._authenticateDirections(); 
            }));
        },
       
       	_createDirections: function(){
    		var directions = new Directions({
						map : this.map
					}, this.div);

			directions.startup();
    	},
    	
    	 _authenticateDirections : function(){
        
            OAuthHelper.checkCookie(); //'oauthappid' in default.js
            
            console.log("isSignedIn: ", OAuthHelper.isSignedIn());
            if (OAuthHelper.isSignedIn() == false)
            {
            	if(this.config.useapplogin == false)
            	{
            		OAuthHelper.signIn();
            	}
            	else
            	{
            		this._authenticateUsingAppID();
            	}
            }
       },
       setMap: function(map){
        	this.map = map;
        	this._createDirections();
       },
       _authenticateUsingAppID : function(){
    		
    		var accessTokenRequest = esriRequest({
				url: this.config.proxyurl + "?OAuth2&appID=" + this.config.oauthappid,
				/*url: "http://localhost/proxy/proxy.ashx?OAuth2&appID=" + appId,*/
	        	handleAs: "json"
			});
		
			accessTokenRequest.then(lang.hitch(this, function(response) {
				console.log("Success: ", response);
				this._tokenObtained(response);
			}), lang.hitch(this, function(error) {
			
				console.log("Error: ", error);
			}));
			
			
    	},
    	_tokenObtained: function(response){
    		//console.log(response);
    		var access_token = response.access_token;
    		console.log(access_token);
    		if(access_token != "Invalid AppID")
    		{
    			
				var expires_in = response.expires_in;
				var expires_at = (new Date()).getTime() + (expires_in * 1000);

				var oauthObj = {
					access_token : access_token,
					expires_at : expires_at,
					expires_in : expires_in,
					ssl : false
				}; 
				
				OAuthHelper.registerToken(oauthObj);
				
			}
    		
    	}
    
    });
});