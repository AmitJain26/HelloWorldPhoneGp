// This file has definition for XMLHelper, serviceRequest, JXON, encodingDecoding, Utils classes

//
// Utils class
//
//

var Utils = {
    putObjectInLocalStorage: function(key,valueObject){
        //console.log('Hi.. I am here');
        //console.log(JSON.stringify(valueObject));
        localStorage.setItem(key,JSON.stringify(valueObject));
    },
        
    getObjectFromLocalStorage: function(key,targetObject){
        //alert('in function getObjectFromLocalStorage with key ' + key);
        var strInLocalStore = localStorage.getItem(key);
        //alert(strInLocalStore);
        //alert(JSON);
        var returnObject = JSON.parse(strInLocalStore);
        //var returnObject = strInLocalStore;
        //alert("returnObject:::");
        //alert(returnObject);
        if(targetObject != undefined){
            returnObject.__proto__ = targetObject.prototype;
        }
        return returnObject;
    },
    
    createNSResolver: function (document) {
        var ns = {};
        if (document.documentElement) {
            var attrs = document.documentElement.attributes;
            for (var i = 0; i < attrs.length; ++i) {
                if (attrs[i].name.indexOf("xmlns:") == 0) {
                    ns[attrs[i].name.substring(6)] = attrs[i].value;
                }
            }
        }
        var nsResolver = function nsResolver(prefix) {
            return ns[prefix] || null;
        };
        nsResolver.lookupNamespaceURI = nsResolver;
        return nsResolver;
    },
    
    removeNSFromXML:function(xml){
        //alert('removeNSFromXML has been called : ' + xml);
        var xmlText = XMLHelper.XMLtoString(xml);
        //alert(xmlText);
        //xmlText = xmlText.replace(/<feed([^>]+)>/g, "<feed>");
        xmlText = xmlText.replace(/<(\/?)([^:>]{1}:)?([^>]+)>/g, "<$1$3>");
        //xmlText = xmlText.replace(/m:type/g, "type");
        //console.log(xmlText);
        var xmlObj = XMLHelper.StringtoXML(xmlText);
      //  alert(XMLHelper.XMLtoString(xmlObj));
        return xmlObj;
    },
    getArrayValue:function(element){
        //alert("In method getArrayValue with : " + element);
        var returnArray = [];
        if(element != null && element != true){
            //alert(element.length);
            if(element.length){
                //alert("Element is an array");
                returnArray = element;
            } else {
                //alert("Element is not an array");
                returnArray.push(element);
            }
        }
        //alert(returnArray);
        return returnArray;
    },
    removeNonPhoneChars:function(item){
        //alert(item);
        item = item.replace(/[^a-zA-Z0-9\.\(\)\-]+/gi, "")
        //alert(item);
        return item;
    },
    removeNonPrintableChars:function(item){
        var re = /[\0-\x1F\x7F-\x9F\xAD\u0378\u0379\u037F-\u0383\u038B\u038D\u03A2\u0528-\u0530\u0557\u0558\u0560\u0588\u058B-\u058E\u0590\u05C8-\u05CF\u05EB-\u05EF\u05F5-\u0605\u061C\u061D\u06DD\u070E\u070F\u074B\u074C\u07B2-\u07BF\u07FB-\u07FF\u082E\u082F\u083F\u085C\u085D\u085F-\u089F\u08A1\u08AD-\u08E3\u08FF\u0978\u0980\u0984\u098D\u098E\u0991\u0992\u09A9\u09B1\u09B3-\u09B5\u09BA\u09BB\u09C5\u09C6\u09C9\u09CA\u09CF-\u09D6\u09D8-\u09DB\u09DE\u09E4\u09E5\u09FC-\u0A00\u0A04\u0A0B-\u0A0E\u0A11\u0A12\u0A29\u0A31\u0A34\u0A37\u0A3A\u0A3B\u0A3D\u0A43-\u0A46\u0A49\u0A4A\u0A4E-\u0A50\u0A52-\u0A58\u0A5D\u0A5F-\u0A65\u0A76-\u0A80\u0A84\u0A8E\u0A92\u0AA9\u0AB1\u0AB4\u0ABA\u0ABB\u0AC6\u0ACA\u0ACE\u0ACF\u0AD1-\u0ADF\u0AE4\u0AE5\u0AF2-\u0B00\u0B04\u0B0D\u0B0E\u0B11\u0B12\u0B29\u0B31\u0B34\u0B3A\u0B3B\u0B45\u0B46\u0B49\u0B4A\u0B4E-\u0B55\u0B58-\u0B5B\u0B5E\u0B64\u0B65\u0B78-\u0B81\u0B84\u0B8B-\u0B8D\u0B91\u0B96-\u0B98\u0B9B\u0B9D\u0BA0-\u0BA2\u0BA5-\u0BA7\u0BAB-\u0BAD\u0BBA-\u0BBD\u0BC3-\u0BC5\u0BC9\u0BCE\u0BCF\u0BD1-\u0BD6\u0BD8-\u0BE5\u0BFB-\u0C00\u0C04\u0C0D\u0C11\u0C29\u0C34\u0C3A-\u0C3C\u0C45\u0C49\u0C4E-\u0C54\u0C57\u0C5A-\u0C5F\u0C64\u0C65\u0C70-\u0C77\u0C80\u0C81\u0C84\u0C8D\u0C91\u0CA9\u0CB4\u0CBA\u0CBB\u0CC5\u0CC9\u0CCE-\u0CD4\u0CD7-\u0CDD\u0CDF\u0CE4\u0CE5\u0CF0\u0CF3-\u0D01\u0D04\u0D0D\u0D11\u0D3B\u0D3C\u0D45\u0D49\u0D4F-\u0D56\u0D58-\u0D5F\u0D64\u0D65\u0D76-\u0D78\u0D80\u0D81\u0D84\u0D97-\u0D99\u0DB2\u0DBC\u0DBE\u0DBF\u0DC7-\u0DC9\u0DCB-\u0DCE\u0DD5\u0DD7\u0DE0-\u0DF1\u0DF5-\u0E00\u0E3B-\u0E3E\u0E5C-\u0E80\u0E83\u0E85\u0E86\u0E89\u0E8B\u0E8C\u0E8E-\u0E93\u0E98\u0EA0\u0EA4\u0EA6\u0EA8\u0EA9\u0EAC\u0EBA\u0EBE\u0EBF\u0EC5\u0EC7\u0ECE\u0ECF\u0EDA\u0EDB\u0EE0-\u0EFF\u0F48\u0F6D-\u0F70\u0F98\u0FBD\u0FCD\u0FDB-\u0FFF\u10C6\u10C8-\u10CC\u10CE\u10CF\u1249\u124E\u124F\u1257\u1259\u125E\u125F\u1289\u128E\u128F\u12B1\u12B6\u12B7\u12BF\u12C1\u12C6\u12C7\u12D7\u1311\u1316\u1317\u135B\u135C\u137D-\u137F\u139A-\u139F\u13F5-\u13FF\u169D-\u169F\u16F1-\u16FF\u170D\u1715-\u171F\u1737-\u173F\u1754-\u175F\u176D\u1771\u1774-\u177F\u17DE\u17DF\u17EA-\u17EF\u17FA-\u17FF\u180F\u181A-\u181F\u1878-\u187F\u18AB-\u18AF\u18F6-\u18FF\u191D-\u191F\u192C-\u192F\u193C-\u193F\u1941-\u1943\u196E\u196F\u1975-\u197F\u19AC-\u19AF\u19CA-\u19CF\u19DB-\u19DD\u1A1C\u1A1D\u1A5F\u1A7D\u1A7E\u1A8A-\u1A8F\u1A9A-\u1A9F\u1AAE-\u1AFF\u1B4C-\u1B4F\u1B7D-\u1B7F\u1BF4-\u1BFB\u1C38-\u1C3A\u1C4A-\u1C4C\u1C80-\u1CBF\u1CC8-\u1CCF\u1CF7-\u1CFF\u1DE7-\u1DFB\u1F16\u1F17\u1F1E\u1F1F\u1F46\u1F47\u1F4E\u1F4F\u1F58\u1F5A\u1F5C\u1F5E\u1F7E\u1F7F\u1FB5\u1FC5\u1FD4\u1FD5\u1FDC\u1FF0\u1FF1\u1FF5\u1FFF\u200B-\u200F\u202A-\u202E\u2060-\u206F\u2072\u2073\u208F\u209D-\u209F\u20BB-\u20CF\u20F1-\u20FF\u218A-\u218F\u23F4-\u23FF\u2427-\u243F\u244B-\u245F\u2700\u2B4D-\u2B4F\u2B5A-\u2BFF\u2C2F\u2C5F\u2CF4-\u2CF8\u2D26\u2D28-\u2D2C\u2D2E\u2D2F\u2D68-\u2D6E\u2D71-\u2D7E\u2D97-\u2D9F\u2DA7\u2DAF\u2DB7\u2DBF\u2DC7\u2DCF\u2DD7\u2DDF\u2E3C-\u2E7F\u2E9A\u2EF4-\u2EFF\u2FD6-\u2FEF\u2FFC-\u2FFF\u3040\u3097\u3098\u3100-\u3104\u312E-\u3130\u318F\u31BB-\u31BF\u31E4-\u31EF\u321F\u32FF\u4DB6-\u4DBF\u9FCD-\u9FFF\uA48D-\uA48F\uA4C7-\uA4CF\uA62C-\uA63F\uA698-\uA69E\uA6F8-\uA6FF\uA78F\uA794-\uA79F\uA7AB-\uA7F7\uA82C-\uA82F\uA83A-\uA83F\uA878-\uA87F\uA8C5-\uA8CD\uA8DA-\uA8DF\uA8FC-\uA8FF\uA954-\uA95E\uA97D-\uA97F\uA9CE\uA9DA-\uA9DD\uA9E0-\uA9FF\uAA37-\uAA3F\uAA4E\uAA4F\uAA5A\uAA5B\uAA7C-\uAA7F\uAAC3-\uAADA\uAAF7-\uAB00\uAB07\uAB08\uAB0F\uAB10\uAB17-\uAB1F\uAB27\uAB2F-\uABBF\uABEE\uABEF\uABFA-\uABFF\uD7A4-\uD7AF\uD7C7-\uD7CA\uD7FC-\uF8FF\uFA6E\uFA6F\uFADA-\uFAFF\uFB07-\uFB12\uFB18-\uFB1C\uFB37\uFB3D\uFB3F\uFB42\uFB45\uFBC2-\uFBD2\uFD40-\uFD4F\uFD90\uFD91\uFDC8-\uFDEF\uFDFE\uFDFF\uFE1A-\uFE1F\uFE27-\uFE2F\uFE53\uFE67\uFE6C-\uFE6F\uFE75\uFEFD-\uFF00\uFFBF-\uFFC1\uFFC8\uFFC9\uFFD0\uFFD1\uFFD8\uFFD9\uFFDD-\uFFDF\uFFE7\uFFEF-\uFFFB\uFFFE\uFFFF]/g;

        item = item.replace(re, " ")
        //alert(item);
        return item;
    }
}

var iconMapper = {
    TWITTER:"images/Twitter.gif",
    LINKEDIN:"images/linkedin.gif",
    HOME:"images/homephone.png",
    BUSINESS:"images/businessphone.png",
    WORK:"images/workphone.png"
}


//
//   serviceRequest class
//
//
var serviceRequest =
(function(){
    var _baseServiceURL = "http://10.131.253.90/PersonifyDataServicesMobile/PersonifyData.svc/";
    var _base64Encoding = null;
    return {
        makeGetServiceRequest:function(serviceName,userName,password){
            var responseXML=null;
            var fullServiceRequestURL = _baseServiceURL + serviceName;
            switch(arguments.length) {
                case 1:
                        _base64Encoding = localStorage.base64Encoding;
                        break;
                case 2: throw new Error('Method : serviceRequest.makeGetServiceRequest, Error : Illegal argument count.');
                case 3:
                        _base64Encoding = hybridEncoderDecoder.make_base_auth(userName,password);
                        localStorage.base64Encoding = _base64Encoding;
                case 4: break;
                default: throw new Error('Method : serviceRequest.makeGetServiceRequest, Error : Illegal argument count.')
            }
            jQuery.support.cors = true;
            $.ajax({
                       type: "GET",
                       //dataType: "application/atom+xml",
                       dataType: "xml",
                       url: fullServiceRequestURL,
                       processData: false,
                       async: false,
                       xhrFields: {
                            withCredentials: true
                       },
                       beforeSend: function (req) {
                            console.log('Method : serviceRequest.makeGetServiceRequest. beforeSend has been called');
                            //req.setRequestHeader('Authorization', hybridEncoderDecoder.make_base_auth(_userName,_password)) ;
                            req.overrideMimeType("text/plain; charset=x-user-defined");
                            req.setRequestHeader('Authorization', _base64Encoding) ;
                       },
                       error: function (XMLHttpRequest, textStatus, errorThrown) {
                            //alert("Method : serviceRequest.makeGetServiceRequest, Error : Text status : " + textStatus + ", Error thrown : " + errorThrown);
                   alert("Can not connect to the network");
                       },
                       success: function (xml) {
                            //alert(xml);
                            //serializer = new XMLSerializer();
                            //serialized = serializer.serializeToString(xml);
                            //console.log(serialized);
                            //alert(serialized);
                            responseXML = xml;
                       }
                   }
            );
            return responseXML;
        },
        makePostServiceRequest:function(serviceName,requestXML){
            var responseXML = null;
            var fullServiceRequestURL = _baseServiceURL + serviceName;
            _base64Encoding = localStorage.base64Encoding;
            $.ajax({
                    type: "POST",
                    //dataType: "application/atom+xml",
                    dataType: "xml",
                    url: fullServiceRequestURL,
                    processData: false,
                    data: requestXML,
                    async: false,
                    cache : false,
                    xhrFields: {
                        withCredentials: true
                    },
                    beforeSend: function (req) {
                       console.log('Method : serviceRequest.makePostServiceRequest. beforeSend has been called');
                       req.overrideMimeType("text/plain; charset=x-user-defined");
                       req.setRequestHeader('Authorization', _base64Encoding) ;
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        console.log("Method : serviceRequest.makePostServiceRequest, Error : Text status : " + textStatus + ", Error thrown : " + errorThrown);
                    },
                    success: function (xml) {
                        responseXML = xml;
                    }
            });
            return responseXML;
        
        }
     }
 })();



//
//  XMLHelper class
//
//
var XMLHelper = {
    StringtoXML : function (text){
        if (window.ActiveXObject){
            var doc=new ActiveXObject('Microsoft.XMLDOM');
            doc.async='false';
            doc.loadXML(text);
        } else {
            var parser=new DOMParser();
            var doc=parser.parseFromString(text,'text/xml');
        }
        return doc;
    },
    XMLtoString:function(xmlNode){
        console.log('XMLtoString has been called');
        var returnString='';
        if (window.ActiveXObject){
            returnString = xmlNode.xml;
        } else {
            returnString = (new XMLSerializer()).serializeToString(xmlNode);
        }
        return returnString;
    }
}

//
//  jxon class
//
//
/*\
|*|
|*|  JXON framework - Copyleft 2011 by Mozilla Developer Network
|*|
|*|  https://developer.mozilla.org/en-US/docs/JXON
|*|
\*/
 
const JXON = new (function () {
  const
    sValueProp = "keyValue", sAttributesProp = "keyAttributes", sAttrPref = "@", /* you can customize these values */
    aCache = [], rIsNull = /^\s*$/, rIsBool = /^(?:true|false)$/i;
 
  function parseText (sValue) {
    if (rIsNull.test(sValue)) { return null; }
    if (rIsBool.test(sValue)) { return sValue.toLowerCase() === "true"; }
    //if (isFinite(sValue)) { return parseFloat(sValue); }
    if (isFinite(sValue)) { return sValue; }
    if (isFinite(Date.parse(sValue))) { return new Date(sValue); }
    return sValue;
  }
 
  function EmptyTree () { }
  EmptyTree.prototype.toString = function () { return "null"; };
  EmptyTree.prototype.valueOf = function () { return null; };
 
  function objectify (vValue) {
    return vValue === null ? new EmptyTree() : vValue instanceof Object ? vValue : new vValue.constructor(vValue);
  }
 
  function createObjTree (oParentNode, nVerb, bFreeze, bNesteAttr) {
    const
      nLevelStart = aCache.length, bChildren = oParentNode.hasChildNodes(),
      bAttributes = oParentNode.hasAttributes(), bHighVerb = Boolean(nVerb & 2);
 
    var
      sProp, vContent, nLength = 0, sCollectedTxt = "",
      vResult = bHighVerb ? {} : /* put here the default value for empty nodes: */ true;
 
    if (bChildren) {
      for (var oNode, nItem = 0; nItem < oParentNode.childNodes.length; nItem++) {
        oNode = oParentNode.childNodes.item(nItem);
        if (oNode.nodeType === 4) { sCollectedTxt += oNode.nodeValue; } /* nodeType is "CDATASection" (4) */
        else if (oNode.nodeType === 3) { sCollectedTxt += oNode.nodeValue.trim(); } /* nodeType is "Text" (3) */
        else if (oNode.nodeType === 1 && !oNode.prefix) { aCache.push(oNode); } /* nodeType is "Element" (1) */
      }
    }
 
    const nLevelEnd = aCache.length, vBuiltVal = parseText(sCollectedTxt);
 
    if (!bHighVerb && (bChildren || bAttributes)) { vResult = nVerb === 0 ? objectify(vBuiltVal) : {}; }
 
    for (var nElId = nLevelStart; nElId < nLevelEnd; nElId++) {
      sProp = aCache[nElId].nodeName.toLowerCase();
      vContent = createObjTree(aCache[nElId], nVerb, bFreeze, bNesteAttr);
      if (vResult.hasOwnProperty(sProp)) {
        if (vResult[sProp].constructor !== Array) { vResult[sProp] = [vResult[sProp]]; }
        vResult[sProp].push(vContent);
      } else {
        vResult[sProp] = vContent;
        nLength++;
      }
    }
 
    if (bAttributes) {
      const
        nAttrLen = oParentNode.attributes.length,
        sAPrefix = bNesteAttr ? "" : sAttrPref, oAttrParent = bNesteAttr ? {} : vResult;
 
      for (var oAttrib, nAttrib = 0; nAttrib < nAttrLen; nLength++, nAttrib++) {
        oAttrib = oParentNode.attributes.item(nAttrib);
        oAttrParent[sAPrefix + oAttrib.name.toLowerCase()] = parseText(oAttrib.value.trim());
      }
 
      if (bNesteAttr) {
        if (bFreeze) { Object.freeze(oAttrParent); }
        vResult[sAttributesProp] = oAttrParent;
        nLength -= nAttrLen - 1;
      }
    }
 
    if (nVerb === 3 || (nVerb === 2 || nVerb === 1 && nLength > 0) && sCollectedTxt) {
      vResult[sValueProp] = vBuiltVal;
    } else if (!bHighVerb && nLength === 0 && sCollectedTxt) {
      vResult = vBuiltVal;
    }
 
    if (bFreeze && (bHighVerb || nLength > 0)) { Object.freeze(vResult); }
 
    aCache.length = nLevelStart;
 
    return vResult;
  }
 
  function loadObjTree (oXMLDoc, oParentEl, oParentObj) {
    var vValue, oChild;
 
    if (oParentObj instanceof String || oParentObj instanceof Number || oParentObj instanceof Boolean) {
      oParentEl.appendChild(oXMLDoc.createTextNode(oParentObj.toString())); /* verbosity level is 0 */
    } else if (oParentObj.constructor === Date) {
      oParentEl.appendChild(oXMLDoc.createTextNode(oParentObj.toGMTString()));    
    }
 
    for (var sName in oParentObj) {
      vValue = oParentObj[sName];
      if (isFinite(sName) || vValue instanceof Function) { continue; } /* verbosity level is 0 */
      if (sName === sValueProp) {
        if (vValue !== null && vValue !== true) { oParentEl.appendChild(oXMLDoc.createTextNode(vValue.constructor === Date ? vValue.toGMTString() : String(vValue))); }
      } else if (sName === sAttributesProp) { /* verbosity level is 3 */
        for (var sAttrib in vValue) { oParentEl.setAttribute(sAttrib, vValue[sAttrib]); }
      } else if (sName.charAt(0) === sAttrPref) {
        oParentEl.setAttribute(sName.slice(1), vValue);
      } else if (vValue.constructor === Array) {
        for (var nItem = 0; nItem < vValue.length; nItem++) {
          oChild = oXMLDoc.createElement(sName);
          loadObjTree(oXMLDoc, oChild, vValue[nItem]);
          oParentEl.appendChild(oChild);
        }
      } else {
        oChild = oXMLDoc.createElement(sName);
        if (vValue instanceof Object) {
          loadObjTree(oXMLDoc, oChild, vValue);
        } else if (vValue !== null && vValue !== true) {
          oChild.appendChild(oXMLDoc.createTextNode(vValue.toString()));
        }
        oParentEl.appendChild(oChild);
     }
   }
  }
 
  this.build = function (oXMLParent, nVerbosity /* optional */, bFreeze /* optional */, bNesteAttributes /* optional */) {
                  //alert('jxon build called');
    const _nVerb = arguments.length > 1 && typeof nVerbosity === "number" ? nVerbosity & 3 : /* put here the default verbosity level: */ 1;
    return createObjTree(oXMLParent, _nVerb, bFreeze || false, arguments.length > 3 ? bNesteAttributes : _nVerb === 3);    
  };
 
  this.unbuild = function (oObjTree) {    
    const oNewDoc = document.implementation.createDocument("", "", null);
    loadObjTree(oNewDoc, oNewDoc, oObjTree);
    return oNewDoc;
  };
})();


//
// encodingDecoding class
//
//
var Base64 = {
    
    // private property
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    
    // public method for encoding
    encode: function(input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        
        input = Base64._utf8_encode(input);
        
        while (i < input.length) {
            
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            
            output = output + this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) + this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
            
        }
        
        return output;
    },
    
    // public method for decoding
    decode: function(input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        
        while (i < input.length) {
            
            enc1 = this._keyStr.indexOf(input.charAt(i++));
            enc2 = this._keyStr.indexOf(input.charAt(i++));
            enc3 = this._keyStr.indexOf(input.charAt(i++));
            enc4 = this._keyStr.indexOf(input.charAt(i++));
            
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            
            output = output + String.fromCharCode(chr1);
            
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
            
        }
        
        output = Base64._utf8_decode(output);
        
        return output;
        
    },
    
    // private method for UTF-8 encoding
    _utf8_encode: function(string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";
        
        for (var n = 0; n < string.length; n++) {
            
            var c = string.charCodeAt(n);
            
            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            
        }
        
        return utftext;
    },
    
    // private method for UTF-8 decoding
    _utf8_decode: function(utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;
        
        while (i < utftext.length) {
            
            c = utftext.charCodeAt(i);
            
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
            
        }
        
        return string;
    }
    
}

var hybridEncoderDecoder = {
    
    hybrid_encode : function(txt) {
        //alert(Base64._utf8_decode(txt));
        if (typeof(btoa) === 'function') {
            return btoa(txt);
        } else {
            return Base64.encode(txt);
        }
    },
    
    hybrid_decode : function(txt) {
        //alert(Base64._utf8_decode(txt));
        if (typeof(atob) === 'function') {
            return atob(txt);
        } else {
            return Base64.decode(txt);
        }
    },
    
    make_base_auth : function(user, password) {
        var tok = user + ':' + password;
        var hash = hybridEncoderDecoder.hybrid_encode(tok);
        //alert(hash);
        //console.log('Encoded text is : ' + hash);
        //console.log('Decoded text is : ' + hybridEncoderDecoder.hybrid_decode(hash));
        return "Basic " + hash;
    }
    
}


