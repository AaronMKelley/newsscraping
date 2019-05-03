// function getNews() {
    
//     $('div').empty();
//     // $('#speaker')
   

//     $.ajax({
//         url: '/pig',
//         method: 'GET'
//     }).then(function (pigpig) {
        

//             var headers = $('<tr>');

//             var id_head= $('<th>')
//             id_head.text("headline")
//             headers.append(id_head);

//             var name_head=$('<th>')
//             name_head.text("summary")
//             headers.append(name_head);

//             var email_head =$('<th>')
//             email_head.text("link")
//             headers.append(email_head);



//             $('#news_table').append(headers);


// for (var pigIndex in pig) {
//     var c = $('<tr>');

//             var pig_head= $('<td>')
//             pig_head.text(`${pig[pigIndex].headline}`)
//             c.append(pig_head);
            
//             var pig_sum= $('<td>')
//             pig_sum.text(`${pig[pigIndex].summary}`)
//             c.append(pig_sum);

//             var pig_link=$('<td>')
//             pig_link.text(`${pig[pigIndex].link}`)
//             c.append(pig_link);

//             var bt = $('<button>')
//             bt.text("Scrape")
//             bt.attr('class', 'scrape')
//             c.append(bt)

//             console.log("You've come to the right place");

//             $('#news_table').append(c)

// }
        
// })
// };


function getNews(){
	
	$.ajax({
		method: 'GET',
		url: '/pig'
	}).then(function(pig){
		debugger;
		for (var pIndex in pig){
	console.log(pIndex)
			var $p = $('<p>');
			$p.text(`headline: ${pig[pIndex].headline} - summary: ${pig[pIndex].summary} - link: ${pig[pIndex].link}`);

			

			var input =$("<input>")
			input.attr('type','text')


			var bt = $('<button>')
			bt.attr('class', 'save');
						bt.text('Save');

			input.append(bt)
			// bt.attr('data-id', frogs[fIndex]._id)

			$p.append(input)

			$('#news_table').append($p);

		}
	})
}
// getNews();

// 	$(document).on('click','.scrape',function(){
		
// 		$.ajax({
// 		method:'GET',
// 		url:`/pig`
// 	}).then(function(news){
// 		getNews();
// 	});
// });