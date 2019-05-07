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
	
	app.get("/pig", function (req, res) {
		// Make a request via axios for the news section of `ycombinator`
		axios.get("https://www.nytimes.com/section/us").then(function (response) {
			// Load the html body from axios into cheerio
			var $ = cheerio.load(response.data);
			//   console.log(response.data)
			// For each element with a "title" class
	
	
	
			$("#stream-panel li").each(function (i, element) {
				// Save the text and href of each link enclosed in the current element
				//    console.log($(element).html())
				var headline = $(element).find("h2").text();
				var summary = $(element).find("p").text();
				var link = $(element).find("a").attr("href");
				var pic =$(element).find('img').attr("src");
				
	
	
				
	
				results.push({
					headline: headline,
					summary: summary,
					link: "www.nytimes.com" + link,
					pic:pic
					
				})
				console.log(results)
			})
	
			db.info.insert(results, function (err, result) {
				// res.send('done');
				res.render('pages/news', {
					results: results
				})
			})
			// res.json(results)
			// console.log(results)
		});
	
	});
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