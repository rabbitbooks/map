var map_img = document.getElementById('map_img'),
	interactive = document.getElementById('interactive'),
	interactive_hover = document.getElementById('interactive_hover'),
	trigger = document.getElementById('trigger'),
	all_cities = document.querySelectorAll('area'),
	card = document.querySelector('.card'),
	map_img_wrapp = document.getElementById('map_img_wrapp');

var clicked = false,
	saved_city_params;
function setCityLiteral(city, click) {
	//Определяем положение триггера и назначаем службный(для функции) триггер если false
	if (trigger.classList.contains('clicked') != true) {
		clicked = false;
	}
	//по уходу мыши определяем, если триггер выключен, то убираем подсветку для города
	city.onmouseout = function(event) {
		if (trigger.classList.contains('clicked') != true) {
			interactive.style.cssText = '';
		} 
		interactive_hover.style.cssText = '';
	}
	
	//проверяем какое событие было, если был первичный клик, то ставим служебный триггер в true
	//и присваеваем переменной trigger_class clicked
	click ? clicked = true : clicked = clicked;
	var trigger_class = clicked ? 'clicked' : '';
	//тем самым ставим триггер в положение "включен"
	trigger.setAttribute('class', trigger_class);
	
	
	if (click != true && clicked === true) {
		saved_city_params = saved_city_params;
	} else if ((click != true && clicked === false) || (click === true && clicked === true)) {
		saved_city_params = getCityParams(city);
	}
	
	var hover_city_params = getCityParams(city),
		vertiacl_coord = clicked ? saved_city_params['bgp_blue'] : saved_city_params['bgp_gray'];

	interactive.style.cssText = "background-position: 0px " + vertiacl_coord + "px; \
	height: " + saved_city_params['height'] + "px; \
	width: " + saved_city_params['width'] + "px; \
	top: " + saved_city_params['top'] + "px; \
	left: " + saved_city_params['left'] + "px; \
	";

	drowCityInfo(city, click);
	
	//если координаты активного элемента совпадают с координатами текщего на веденного, то наведнный
	//не показывать
	if (hover_city_params['bgp_gray'] == saved_city_params['bgp_gray']) {
		interactive_hover.style.cssText = '';
	} else {
		interactive_hover.style.cssText = "background-position: 0px " + hover_city_params['bgp_gray'] + "px; \
		height: " + hover_city_params['height'] + "px; \
		width: " + hover_city_params['width'] + "px; \
		top: " + hover_city_params['top'] + "px; \
		left: " + hover_city_params['left'] + "px; \
		";
	}
}

function drowCityInfo(city, click) {
	var city_info = getCityCard(city),
		card_content = '';

	if (click === true) {

		if (!isset(city_info['name'])) {
			card.innerHTML = '';
			card.style.cssText = '';

			return false;
		}

		if (isArray(city_info['name'])) {

			for (var i = 0; i < city_info['name'].length; i++) {
				if ( isset(city_info['name'][i]) && isset(city_info['site'][i]) ) {
					card_content+= '<a href="'+ city_info['site'][i] +'" class="clinic" target="_blank">'+ city_info['name'][i] +'</a>';
				} else if (isset(city_info['name'][i]) && !isset(city_info['site'][i])) {
					card_content+= '<p class="clinic">'+ city_info['name'][i] +'</p>';
				}
			}
		} else {
			if ( isset(city_info['name']) && isset(city_info['site']) ) {
				card_content+= '<a href="'+ city_info['site'] +'" class="clinic" target="_blank">'+ city_info['name'] +'</a>';
			} else if (isset(city_info['name']) && !isset(city_info['site'])) {
				card_content+= '<p class="clinic">'+ city_info['name'] +'</p>';
			}
		}

		var card_position = getCardPosition(city);
		card.innerHTML = card_content;

		card.style.cssText = "top: "+ card_position['top'] +"px; \
		left: "+ card_position['left'] +"px; \
		opacity: 1; \
		";
	}
}

function getCardPosition(city) {
	var city_name_rus = city.getAttribute('alt'),
		city_position = Array();

	var cityes = {
		'Москва' : 'moscow',
		'Махачкала' : 'mahachkala',
		'Краснодар, Сочи, Адлер' : 'krasnodar',
		'Волгоград' : 'volgograd',
		'Казахстан' : 'kazahstan',
		'Екатеринбург' : 'ekaterinburg',
		'Санкт-Петербург' : 'spb',
		'Саратов' : 'saratov',
		'Набережные Челны' : 'chelny',
		'Иркутск' : 'irkutsk',
		'Ульяновск' : 'ulyanovsk',
		'Ижевск' : 'izhevsk',
		'Курган' : 'kurgan',
		'Чита' : 'chita',
		'Архангельск' : 'arhangelsk',
	}

	var city_mark = document.querySelector('.mark.'+ cityes[city_name_rus]),
		style = window.getComputedStyle(city_mark);

	city_position['top'] = Number(style.getPropertyValue('top').replace('px','')) + 27;
	city_position['left'] = Number(style.getPropertyValue('left').replace('px','')) - 16;

	return city_position;
}

all_cities.forEach(function(item){
	item.addEventListener("mouseover", function(){
		setCityLiteral(this);
	});
	item.addEventListener("click", function(){
		setCityLiteral(this, true);
	});
	item.onmousedown = function() {
		card.style.opacity = 0;
		card.style.transition = 'none';
	}
	item.onmouseup - function() {
		card.style.opacity = 1;
		card.style.transition = '';
	}
});

document.querySelectorAll('.mark').forEach(function(item){
	item.addEventListener("mouseover", function(){
		setCityLiteral(this);
	});
	item.addEventListener("click", function(){
		setCityLiteral(this, true);
	});
	item.onmousedown = function() {
		card.style.opacity = 0;
		card.style.transition = 'none';
	}
	item.onmouseup - function() {
		card.style.opacity = 1;
		card.style.transition = '';
	}
});

map_img.addEventListener("click", function(){
	trigger.setAttribute('class', '');
	interactive.style.cssText = '';
	card.style.cssText = '';
	card.innerHTML = '';
});

function isArray(variable) {
	return Object.prototype.toString.call( variable ) === '[object Array]';
}
function isset(variable) {
    return typeof variable !== 'undefined';
}

function getCityCard(city) {
	city = city.getAttribute("alt");
	var city_info = Array();

	if (!isset(city)) return false;

	switch(city) {
		case "Москва":
			city_info['name'] = [
				'Telo`s Beauty',
				'Real clinic',
				'Tori',
				'Rosh',
				'Время Красоты',
				'Ap-Med',
				'Ремеди Лаб',
				'L`Art',
				'GTM Clinic',
				'Эстет Клиник',
				'Lasr Jazz',
				'Эклан',
				'Открытая клиника',
				'КИЭМ',
				'МильФей',
				'New Me',
				'Лапино',
			];
			city_info['site'] = [
				'http://www.telosbeauty.ru/',
				'http://real-clinic.com/',
				'http://toriclinic.ru/',
				'http://www.medcenterrosh.ru/',
				'http://vrkr.ru/',
				'http://ap-med.ru/',
				'https://remedylab.ru/',
				'http://lartclinic.ru/',
				'http://gmt-clinic.ru/',
				'http://www.estetclinic.ru/',
				'https://www.llc1.ru/',
				'http://mc-eklan.ru/',
				'https://ok-kurkino.ru/',
				'http://aestmed.ru/',
				'http://milfey.ru/',
				'http://newme.clinic/',
				'https://mamadeti.ru/clinics/moscow/clinical-hospital-lapino/',
			];
		break;

		case "Волгоград":
			city_info['name'] = 'Ассоль';
			city_info['site'] = 'http://assol34.ru/';
		break;

		case "Ижевск":
			city_info['name'] = 'Лимаж';
			city_info['site'] = 'https://limage-club.ru/';
		break;

		case "Саратов":
			city_info['name'] = 'Beautys Cience';
			city_info['site'] = 'http://beautyscience.ru/';
		break;

		case "Набережные Челны":
			city_info['name'] = 'Luxor';
			city_info['site'] = 'http://luxor-chelny.ru/';
		break;

		case "Курган":
			city_info['name'] = 'Посольсвто красоты';
			city_info['site'] = 'http://beauty45.ru/';
		break;

		case "Краснодар, Сочи, Адлер":
			city_info['name'] = [
				'Лица',
				'E@S Стандарт',
				'Даниэль',
				'BelleVie'
			];
			city_info['site'] = [
				'https://www.facebook.com/facesclinic/',
				'https://ec-standart.ru/',
				'http://danielsochi.ru/',
				'http://www.bellevie-cln.ru/'
			];
		break;

		case "Архангельск":
			city_info['name'] = 'Vesta';
			city_info['site'] = 'http://vesta29.ru/';
		break;

		case "Санкт-Петербург":
			city_info['name'] = 'Фрезия';
			city_info['site'] = 'http://freesia-salon.ru/';
		break;

		case "Иркутск":
			city_info['name'] = 'Beauty Med';
			city_info['site'] = 'http://beautymed38.ru/';
		break;

		case "Махачкала":
			city_info['name'] = 'Олимп';
			city_info['site'] = 'https://olimp-05.ru/';
		break;

		case "Екатеринбург":
			city_info['name'] = [
				'T.Y.ШЬ',
				'Beauty Club',
				'Спа-Салон Тихвин'
			];
			city_info['site'] = [
				'http://tyshspa.ru/',
				'https://www.beautyclub-ek.ru/',
				'http://wellness-tikhvin.ru/'
			];
		break;

		case "Казахстан":
			city_info['name'] = 'Tulip Medecine';
			city_info['site'] = 'http://t-med.kz/';
		break;

		case "Чита":
			city_info['name'] = 'Med Люкс';
			city_info['site'] = 'http://medlux75.ru/';
		break;

		case "Ульяновск":
		break;

	}

	return city_info;
}

function getCityParams(city) {
	city = city.getAttribute("alt");
	var city_params = Array();

	switch(city) {
		case "Москва":
			city_params['bgp_gray'] = '0';
			city_params['bgp_blue'] = '-78';
			city_params['width'] = '69';
			city_params['height'] = '79';
			city_params['top'] = '390';
			city_params['left'] = '198';
		break;

		case "Махачкала":
			city_params['bgp_gray'] = '-160';
			city_params['bgp_blue'] = '-193';
			city_params['width'] = '23';
			city_params['height'] = '32';
			city_params['top'] = '711';
			city_params['left'] = '184';
		break;

		case "Краснодар, Сочи, Адлер":
			city_params['bgp_gray'] = '-230';
			city_params['bgp_blue'] = '-324';
			city_params['width'] = '81';
			city_params['height'] = '84';
			city_params['top'] = '582';
			city_params['left'] = '78';
		break;

		case "Волгоград":
			city_params['bgp_gray'] = '-410';
			city_params['bgp_blue'] = '-505';
			city_params['width'] = '105';
			city_params['height'] = '96';
			city_params['top'] = '529';
			city_params['left'] = '178';
		break;

		case "Казахстан":
			city_params['bgp_gray'] = '-599';
			city_params['bgp_blue'] = '-889';
			city_params['width'] = '562';
			city_params['height'] = '290';
			city_params['top'] = '581';
			city_params['left'] = '235';
		break;

		case "Екатеринбург":
			city_params['bgp_gray'] = '-1180';
			city_params['bgp_blue'] = '-1333';
			city_params['width'] = '130';
			city_params['height'] = '152';
			city_params['top'] = '422';
			city_params['left'] = '443';
		break;

		case "Санкт-Петербург":
			city_params['bgp_gray'] = '-1483';
			city_params['bgp_blue'] = '-1579';
			city_params['width'] = '115';
			city_params['height'] = '96';
			city_params['top'] = '257';
			city_params['left'] = '187';
		break;

		case "Саратов":
			city_params['bgp_gray'] = '-1675';
			city_params['bgp_blue'] = '-1778';
			city_params['width'] = '115';
			city_params['height'] = '103';
			city_params['top'] = '513';
			city_params['left'] = '226';
		break;

		case "Набережные Челны":
			city_params['bgp_gray'] = '-1881';
			city_params['bgp_blue'] = '-1968';
			city_params['width'] = '97';
			city_params['height'] = '87';
			city_params['top'] = '481';
			city_params['left'] = '322';
		break;

		case "Иркутск":
			city_params['bgp_gray'] = '-2055';
			city_params['bgp_blue'] = '-2370';
			city_params['width'] = '288';
			city_params['height'] = '313';
			city_params['top'] = '434';
			city_params['left'] = '897';
		break;

		case "Ульяновск":
			city_params['bgp_gray'] = '-2682';
			city_params['bgp_blue'] = '-2745';
			city_params['width'] = '72';
			city_params['height'] = '63';
			city_params['top'] = '499';
			city_params['left'] = '288';
		break;

		case "Ижевск":
			city_params['bgp_gray'] = '-2807';
			city_params['bgp_blue'] = '-2884';
			city_params['width'] = '66';
			city_params['height'] = '77';
			city_params['top'] = '457';
			city_params['left'] = '374';
		break;

		case "Курган":
			city_params['bgp_gray'] = '-2962';
			city_params['bgp_blue'] = '-3036';
			city_params['width'] = '100';
			city_params['height'] = '74';
			city_params['top'] = '548';
			city_params['left'] = '482';
		break;

		case "Чита":
			city_params['bgp_gray'] = '-3109';
			city_params['bgp_blue'] = '-3345';
			city_params['width'] = '186';
			city_params['height'] = '236';
			city_params['top'] = '543';
			city_params['left'] = '1066';
		break;

		case "Архангельск":
			city_params['bgp_gray'] = '-3583';
			city_params['bgp_blue'] = '-3750';
			city_params['width'] = '177';
			city_params['height'] = '167';
			city_params['top'] = '242';
			city_params['left'] = '304';
		break;
		
	}
	return city_params;
}