var chatInfra = io.connect('/chat_infra'),
      chatCom = io.connect('/chat_com');

chatInfra.on('name_set',function(data){
	// console.log("hello")
	chatInfra.on('user_entered',function(user){
		console.log("Hello");
		$('#messages').append('<div class="systemMessage">' + user.name + '  has joined the room.  </div>' );
		});

	chatInfra.on('message',function(message){
		var messages = JSON.parse(message);
		$('#messages').append('<div class='+ messages.type +' >'
			+ messages.message +'</div>');
	});

	chatCom.on('message',function(messages){
		var message = JSON.parse(messages);
		$('#messages').append('<div class='+ message.type + ' ><span class="name">'+
			message.username + ':</span> ' + message.message + '</div>');
	});

	$('#nameform').hide();
	$('#message').append('<div class="systemMessage">hello ' + data.name + '</div>');
	$('#send').click(function(){
		var data = {
			message: $('#message').val(),
			type:'userMessage'
		};
		chatCom.send(JSON.stringify(data));
		$('#message').val(' ');
	});
});

$(function(){
	$('#setname').click(function(){
		chatInfra.emit("set_name",{name:$('#nickname').val()});
	});
});



