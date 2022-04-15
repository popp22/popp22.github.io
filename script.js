async function main()
{
	var author = document.getElementById("author").value;
	var title = document.getElementById("title").value;
	var subject = document.getElementById("subject").value;
	var journal = document.getElementById("journal").value;
	var keywords = document.getElementById("keywords").value;
	var doi = document.getElementById("doi").value;
	var year = document.getElementById("year").value;
	sessionStorage.setItem("author", JSON.stringify(author));
	sessionStorage.setItem("title",JSON.stringify(title));
	sessionStorage.setItem("subject",JSON.stringify(subject));
	sessionStorage.setItem("journal",JSON.stringify(journal));
	sessionStorage.setItem("keywords",JSON.stringify(keywords));
	sessionStorage.setItem("doi",JSON.stringify(doi));
	sessionStorage.setItem("year",JSON.stringify(year));

	var parsed;
	var url = 'https://raw.githubusercontent.com/popp22/popp22.github.io/main/test.json';
	
	parsed = await getJSON(url);

	var papers = search(parsed, author, title, subject, year, journal, keywords, doi);
	
	try
	{
		if(papers.length > 0)
		{
			sessionStorage.setItem("Papers", JSON.stringify(papers));
			location.href = "./output.html";
		}
		else
		{
			sessionStorage.setItem("Papers", JSON.stringify(papers));
			location.href = "./output.html";
		}
	}
	catch
	{
		sessionStorage.setItem("Papers", JSON.stringify(papers));
		location.href = "./output.html";
	}
	

}

function submitFormat()
{
	        var b = document.createElement("button");
		    b.innerHTML = "To search a new paper click this button!";
		    b.onclick = function()
		    {
                location.href = "./test.html";
		    };
		    document.body.appendChild(b);
}

async function getJSON(url)
{
	const response = await fetch(url);
	return response.json();  
}
function printOutput()
{
	
	var responseObj = JSON.parse(this.responseText);
	for(i = 0; i < Object.keys(parsed).length; i++)
	{
		console.log(responseObj[i].name);
	}
	sessionStorage.setItem("folder", JSON.stringify(responseObj[0]));
	
}
async function getJSONFolder()
{
	var request = new XMLHttpRequest();
	request.onload = printOutput();
	request.open('get' , 'https://api.github.com/repos/popp22/popp22.github.io/contents/jsonTestFolder', true);
	request.send();
	
}

function search(parsed, author, title, subject, year, journal, keywords, doi)
{ 
	var papers = new Array();
	for(i = 0; i < Object.keys(parsed).length; i++)
	{
		try
		{
			
			//Check author
			if(!(chkAut(author, parsed[i].authors)))
			{
				continue;
			}
			//Check title
			if(!(chkTitle(title, removeSlashnFromJson(parsed[i].title))))
			{
				continue;
			}
			//Check subject
			if(!(chkSub(subject, parsed[i].subject)))
			{
				continue;
			}
			//Check year
			if(!(chkYear(year, parsed[i].journal)))
			{
				continue;
			}
			//Check journal
			if(!(chkJournal(journal, parsed[i].journal)))
			{
				continue;
			}
			//check keywords
			if(!(chkKeywords(keywords, removeSlashnFromJson(parsed[i].keywords))))
			{
				continue;
			}
			//check DOI
			if(!(chkDoi(doi, parsed[i].doi)))
			{
				continue;
			}
			console.log("Made it");
			papers.push(parsed[i]);

		}
		catch
		{
			console.log("Error");
			continue;
		}
	}
	return papers;
}

function chkAut(author, parsAuthor) 
{
	try
	{
		if(!(parsAuthor.toLowerCase().includes(author.toLowerCase())))
		{
			return false;
		}
		else
		{
			return true;
		}
	}
	catch
	{
		console.log("Author undefined");
		return false;
	}
}

function chkTitle(title, parsTitle) 
{
	try
	{
		if(!(parsTitle.toLowerCase().includes(title.toLowerCase())))
		{
			return false;
		}
		else
		{
			return true;
		}
	}
	catch
	{
		console.log("Title undefined");
		return false;
	}
}

function chkSub(subject, parsSub) 
{
	try
	{
		for(j = 0; j < parsSub.length; j++)
		{
			if(!(parsSub[j].toLowerCase().includes(subject.toLowerCase())))
			{
				continue;
			}
			else
			{
				return true;
			}
		}
		return false;
		
		
	}
	catch
	{
		console.log("Subject undefined");
		return false;
	}
}

function chkYear(year, parsJournal)
{
	try
	{
		if(!(parsJournal.toLowerCase().includes(year.toLowerCase())))
		{
			return false;
		}
		else
		{
			return true;
		}
	}
	catch
	{
		console.log("Year undefined");
		return false;
	}
}

function chkJournal(journal, parsJournal)
{
	try
	{
		if(!(parsJournal.toLowerCase().includes(journal.toLowerCase())))
		{
			return false;
		}
		else
		{
			return true;
		}
	}
	catch
	{
		console.log("journal undefined");
		return false;
	}
}
function chkKeywords(keywords, parsKeywords)
{
	try
	{
		for(j = 0; j < parsKeywords.length; j++)
		{
			if(!(parsKeywords[j].toLowerCase().includes(keywords.toLowerCase())))
			{
				continue;
			}
			else
			{
				return true;
			}
		}
		return false;
		
		
	}
	catch
	{
		console.log("keywords undefined");
		return false;
	}
}
function chkDoi(doi, parsDoi)
{
	try
	{
		if(!(parsDoi.toLowerCase().includes(doi.toLowerCase())))
		{
			return false;
		}
		else
		{
			return true;
		}
	}
	catch
	{
		console.log("DOI undefined");
		return false;
	}
}
function removeSlashnFromJson(str)
{
	console.log(JSON.stringify(str));
	str = JSON.stringify(str);
	if(str.includes("\\n"))
	{
	   str = str.replace("\\n", "");
	   console.log("yer");
	   console.log(str);
	   str = JSON.parse(str);
	   console.log(str);
	}
	return str;
}