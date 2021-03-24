alert('i am active');

  $('body').prepend('<div id="info" style="padding: 40px;background: white;color: black;text-align: center;width: 100%;position: fixed;font-weight: 900;cursor: pointer;z-index: 99;line-height: 2;font-family: \'trebuchet ms\';font-weight: 100;bottom:0px;" >DISPLAY RESULTS</div>');

    var title = $('title').text();



   function ai() {
       //getclientid();
       var cid;
       if(sessionStorage.cid==undefined) {
           cid= prompt('Client ID: ');
           sessionStorage.cid=cid;
       }else{cid=sessionStorage.cid;}

            //cid='ff9673dd40a0454ab99e0c5113a3380d';
            let socket = new WebSocket('wss://vsonline-proxy.bet9ja.com/vs');

            socket.onopen = function(e) {

               socket.send('{"type":"REQUEST","xs":199,"ts":'+Date.now()+',"req":{"method":"GET","query":{"contentType":"PLAYLIST","contentId":1001,"countDown":120,"offset":0,"eventTime":'+Math.floor(Date.now()/1000)+',"n":1,"profile":"WEB","oddSettingId":12},"headers":{"Content-Type":"application/json","clientId":"'+cid+'"},"resource":"/eventBlocks/event/data","basePath":"/api/client/v0.1","host":"wss://vsonline-proxy.bet9ja.com:443"}}');

            };

            socket.onmessage = function(event) {
               if(event.data!=sessionStorage.eventdata){

                  sessionStorage.eventdata=event.data;
                  var er=JSON.parse(event.data);$('#info').html('<table><thead><TR><th>No</th><th>ID</th><th>NAME</th><th>SEX</th><th>PACE</th><th>TRACK CONDTN</th><th>PROB</th><th>GROUP</th><th>FORM</th><th>FORECAST</th><th>ART</th></TR><tbody id="infoo"></tbody></table>');
                  for (var i = 0; i < 7; i++) {
                     var r=i+1;
                    $("#infoo").append('<tr><td>'+r+'</td><td>'+er.res.body[0].events[0].data.participants[i].id+'</td><td>'+er.res.body[0].events[0].data.participants[i].name+'</td><td>'+er.res.body[0].events[0].data.participants[i].sex+'</td><td>'+er.res.body[0].events[0].data.participants[i].pace+'</td><td>'+er.res.body[0].events[0].data.participants[i].trackCondition.toFixed(2)+'</td><td>'+er.res.body[0].events[0].data.participants[i].prob.toFixed(2)+'</td><td>'+er.res.body[0].events[0].data.participants[i].group+'</td><td>'+er.res.body[0].events[0].data.participants[i].form.toFixed(2)+'</td><td>'+er.res.body[0].events[0].data.participants[i].forecast+'</td><td>'+er.res.body[0].events[0].data.participants[i].art.toFixed(2)+'</td></tr>');
                  }
               }
            };
   }

    sessionStorage.stat='!';
 sessionStorage.statres='';
  console.log('#######################################################################################');
  console.log('#######################################################################################\n');


      setInterval(function(){
ai();
      },5000);
