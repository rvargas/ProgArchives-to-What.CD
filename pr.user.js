// ==UserScript==
// @name        ProgArchive to What.CD, TPB & KAT
// @version     0.2
// @namespace   http://paranoideo.com/
// @description Convierte las ligas de ProgArchives para realizar busquedas en what.cd
// @include     http://www.progarchives.com/top-prog-albums.asp*
// ==/UserScript==

cambiarLinks(document.body);

function cambiarLinks(container){

	var anchor = null;
	var tdContainer;
	var items;
	
	var urlArtist = "https://what.cd/artist.php?artistname="
	var urlAlbum = "https://what.cd/torrents.php?action=advanced&groupname="
	var todo = "https://what.cd/torrents.php?artistname=GROUPNAME&action=advanced&groupname=ALBUMNAME"
	
	var albumSTR = "album";
	var artistSTR = "artist";
	var shopSTR = "buymusic";

	var album = '';
	var artist = '';
	
	tdContainer = container.getElementsByTagName('td');
	
	for (var i = 0; i < tdContainer.length; i++) {
		items = tdContainer[i].getElementsByTagName('a');
		
		for (var j = 0; j < items.length; j++) {
			
			if(items[j].href.search(albumSTR) != -1){

				if(items[j].href.search(shopSTR) != -1){
					items[j].href = todo.replace("GROUPNAME",artist).replace("ALBUMNAME",album).replace(/ /g,"+").replace(/(<([^>]+)>)/ig,"");
					items[j].setAttribute('target', '_blank');
					items[j].innerHTML = "what.cd<br>"

					tdContainer[i].appendChild(generarLinks(album,artist));
					tdContainer[i].setAttribute('style','text-align: center')
				}
				else{
					items[j].href = urlAlbum + items[j].innerHTML.replace(/ /g,"+").replace(/(<([^>]+)>)/ig,"");
					items[j].setAttribute('target', '_blank');
					album = items[j].innerHTML.replace(/(<([^>]+)>)/ig,"");
				}
			}

			else if (items[j].href.search(artistSTR) != -1) {
				items[j].href = urlArtist + items[j].innerHTML.replace(/ /g,"+")
				items[j].setAttribute('target', '_blank');
				artist = items[j].innerHTML;
			}
		}
	}
}

function generarLinks(album,artista){
	div = document.createElement('div');

	div.appendChild(generarLinkTPB(album,artista));
	div.innerHTML += '|'
	div.appendChild(generarLinkKAT(album,artista));
	return div;
}

function generarLinkTPB(album,artista){
	a = document.createElement('a');
	a.innerText = 'TPB';
	a.textContent = 'TPB';
	a.href = 'http://thepiratebay.se/search/'+artista+' '+album;
	a.setAttribute('target', '_blank');
	return a;
}

function generarLinkKAT(album,artista){
	a = document.createElement('a');
	a.innerText = 'KAT';
	a.textContent = 'KAT';
	a.href = 'http://kat.ph/usearch/'+artista+' '+album;
	a.setAttribute('target', '_blank');
	return a;
}