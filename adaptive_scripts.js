//window.innerWidth
/*style = window.getComputedStyle(city_mark);
Number(style.getPropertyValue('top').replace('px',''))*/

var AreaParams = function(str) {
const array = str.split(',');
 	
this.result = array.reduce((acc, current, index) => {
    if (!acc.coords_top) {
        acc.coords_top = [];
    }
    if (!acc.coords_left) {
        acc.coords_left = [];
    }
  	if (index % 2) {
    	acc.coords_top.push(parseInt(current));
    } else {
    	acc.coords_left.push(parseInt(current));
    }

    return acc;
  	}, {});

  	this.getAreaParams = function() {
  		this.top = Math.min.apply(null, this.result.coords_top);
    	this.left = Math.min.apply(null, this.result.coords_left);
    	this.right = Math.max.apply(null, this.result.coords_left);
  	}

this.getAreaParams();
this.width = this.right - this.left;
}

map_img_wrapp.onclick = function(e) {
	target = e.target;

	while (target != this) {
        if (target.classList.contains('mark') || target.classList.contains('shape')) {
	        let target_alt = target.getAttribute('alt');
	        let mark = document.querySelector('p[alt = "'+ target_alt +'"]');

	        let card_left = parseInt(card.style.left.replace('px','')),
				card_info = card.getBoundingClientRect(),
				card_right = card_info.width + card_left;
				
			let map_wrapper_style = window.getComputedStyle(this),
				current_position = -parseInt(map_wrapper_style.getPropertyValue('left')) + window.innerWidth;

			if (target.classList.contains('shape')) {
				let coords = target.getAttribute('coords');
				let area_position = new AreaParams(coords);
				
				if (area_position.right > current_position || card_right > current_position) {
					if (card_right > area_position.right) {
						map_img_wrapp.style.left = -(card_right - window.innerWidth) +'px';
					} else {
						map_img_wrapp.style.left = -(area_position.right - window.innerWidth) +'px';
					}	
				}
			}

	        return;
        }
        target = target.parentNode;
    }
    
	if (target.classList.contains('card') || target.classList.contains('shape')) return false;
}

function getCoords(elem) { // кроме IE8-
  	var box = elem.getBoundingClientRect();

  	return {
    	top: box.top + pageYOffset,
    	left: box.left + pageXOffset
  	};
}