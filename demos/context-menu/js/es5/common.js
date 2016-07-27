'use strict';

var $id = function $id(id) {
	return document.getElementById(id);
},
    $sel = function $sel(selector) {
	return document.querySelectorAll(selector);
},
    $createEl = function $createEl(tag, cls, id, innerTxt) {
	var newElement = document.createElement(tag);
	if (cls !== null && cls !== undefined) newElement.className = cls;
	if (id !== null && id !== undefined) newElement.id = id;
	if (innerTxt !== null && innerTxt !== undefined) newElement.innerHTML = innerTxt;
	return newElement;
};

var deleteClass = function deleteClass(elem, wannaDelete) {
	var className = elem.className || undefined;
	if (className !== '' && className !== undefined) {
		var regex = void 0;
		// to prevent appearence of spaces after deleting name of class
		if (elem.classList[0] === wannaDelete) {
			regex = new RegExp(wannaDelete);
		} else {
			regex = new RegExp(' ' + wannaDelete);
		}
		elem.className = elem.className.replace(regex, '');
	}
};

var addClass = function addClass(elem, wannaAdd) {
	var className = elem.className || undefined;
	// to prevent appearence of spaces after adding name of class
	if (className === '' || className === undefined) {
		elem.className += '' + wannaAdd;
	} else {
		var classList = [].slice.call(elem.classList);
		var existed = false;
		classList.forEach(function (_class) {
			if (wannaAdd === _class) {
				existed = true;
			}
		});
		if (!existed) {
			elem.className += ' ' + wannaAdd;
		}
	}
};

var request = new XMLHttpRequest();
request.open("get", "js/config-long.json", false);
request.send();

var model = JSON.parse(request.responseText);
var clickArea = $id(model.location);clickArea.className += ' has-context-menu';
var listItems = model.listItems;
var liContainer = void 0,
    submenuId = 1;

var createStructure = function createStructure(arr, isSubmenu) {
	if (!isSubmenu) {
		var ul = $createEl('ul', 'menu', 'main-menu');
		var wrapper = $createEl('div', null, 'wrapper');
		clickArea.appendChild(wrapper);
		wrapper.appendChild(ul);
	} else {
		var ul = $createEl('ul', 'menu submenu', 'sub-' + submenuId++);
		liContainer.appendChild(ul);
	}
	arr.map(function (item, index) {
		var li = $createEl('li', 'menu-item', null, item.title);
		ul.appendChild(li);
		if (!item.enabled) {
			li.className += ' disabled';
		}
		if (item.submenu.length > 0) {
			li.className += ' has-submenu';
			liContainer = li;
			createStructure(item.submenu, true);
		} else {
			li.setAttribute('onclick', '' + item.onclick);
		}
	}); // map
};
createStructure(listItems, false);

var arrowUp = void 0,
    arrowDown = void 0,
    mainMenuHasScroll = false;

;(function () {
	// let eachMenu = $sel('ul.menu');
	var menu = $id('main-menu'),
	    wrapperHeight = $id('wrapper').clientHeight,
	    menuHeight = menu.clientHeight;
	if (menuHeight > wrapperHeight) {
		mainMenuHasScroll = true;
		menu.className += ' has-scroll';
		var _arrowUp = $createEl('li', 'arrow arrow-up disabled'),
		    _arrowDown = $createEl('li', 'arrow arrow-down');

		_arrowUp.setAttribute('onclick', 'arrowEvent(this)');
		_arrowDown.setAttribute('onclick', 'arrowEvent(this)');
		menu.appendChild(_arrowUp);
		menu.appendChild(_arrowDown);
		arrowUp = $sel('#main-menu > .arrow-up');
		arrowDown = $sel('#main-menu > .arrow-down');
		arrowUp = arrowUp[0];
		arrowDown = arrowDown[0];
	}
})();

var topMenuPosition = void 0,
    leftMenuPosition = void 0,
    relativeSubmenuPositionX = 0,
    relativeSubmenuPositionY = 0,
    menuHeight = void 0,
    menuWidth = void 0;

var menuAppeared = false;
window.addEventListener('click', function (e) {
	if (e.target == clickArea || e.target.parentNode == clickArea) {
		if (!menuAppeared) {
			menuAppeared = true;
			setClickPosition(e);
			return;
		}
	}
	if (menuAppeared) {
		var menu = $id('main-menu'),
		    _wrapper = $id('wrapper'),
		    getClasses = e.target.className,
		    submenuParentItem = getClasses.search('has-submenu'),
		    checkForUl = e.target.nodeName,
		    checkForArrow = e.target.classList[0];

		if (checkForUl !== 'UL' && submenuParentItem === -1 && checkForArrow !== 'arrow') {
			deleteClass(_wrapper, 'visible');
			deleteClass(menu, 'show-menu');
			menuAppeared = false;
			if (mainMenuHasScroll) resetItemPosition();
		}
	}
});

var setClickPosition = function setClickPosition(e) {
	var x = e.clientX,
	    y = e.clientY,
	    menu = $id('main-menu');

	topMenuPosition = y;
	leftMenuPosition = x;
	menu.style.left = x - 10 + 'px';
	menuHeight = menu.clientHeight;
	menuWidth = menu.clientWidth;
	wrapper.className += 'visible';
	menu.className += ' show-menu';
	preventOverflow();
};

var preventOverflow = function preventOverflow() {
	var scrollTop = document.body.scrollTop,
	    menu = $id('main-menu'),
	    bottomMenuPosition = topMenuPosition + menuHeight,
	    rightMenuPosition = leftMenuPosition + menuWidth,
	    bottomFixed = false;
	if (!mainMenuHasScroll) {
		// setting menu Y-position
		if (viewportY - 10 <= bottomMenuPosition) {
			menu.style.top = 'auto';
			menu.style.bottom = 0;
			bottomFixed = true;
		} else {
			menu.style.bottom = 'auto';
			menu.style.top = topMenuPosition - 10 + 'px';
		}
	}
	setSubmenusPositionY(mainMenuHasScroll, bottomFixed);
	// setting menu X-position
	if (viewportX - 10 <= rightMenuPosition) {
		menu.style.left = 'auto';
		menu.style.right = '10px';
		relativeSubmenuPositionX = 0;
		setSubmenusPositionX();
	} else {
		menu.style.right = 'auto';
		relativeSubmenuPositionX = menu.clientWidth;
		setSubmenusPositionX();
	}
};

var setSubmenusPositionY = function setSubmenusPositionY(mainScroll, bottomFixed) {
	var submenus = [].slice.call($sel('ul.submenu'));
	if (mainScroll) topMenuPosition = 0;else {
		if (bottomFixed) {
			topMenuPosition = viewportY - 20 - menuHeight;
		}
	}
	submenus.forEach(function (submenu, i) {
		relativeSubmenuPositionY = 0;
		getRelativePosition(submenu);
		// setting submenu Y-position
		if (viewportY - 20 <= topMenuPosition + relativeSubmenuPositionY + submenu.clientHeight) {
			submenu.style.top = 'auto';
			submenu.style.bottom = '-1px';
		} else {
			submenu.style.top = '-1px';
			submenu.style.bottom = 'auto';
		}
	});
};

var getRelativePosition = function getRelativePosition(item) {
	var menu = $id('main-menu');
	if (item != menu) {
		if (item.parentNode.parentNode !== menu && item.parentNode.parentNode.offsetTop < -1) {
			relativeSubmenuPositionY -= item.parentNode.parentNode.offsetHeight - item.parentNode.offsetTop - item.parentNode.clientHeight;
		} else {
			relativeSubmenuPositionY += item.parentNode.offsetTop;
		}
		if (item.parentNode.parentNode !== menu) {
			getRelativePosition(item.parentNode.parentNode);
		}
	} else {
		return;
	}
};

var submenuLevels = [];

;(function () {
	var checkLevel = [],
	    level = 'ul';
	for (var i = 0; i < submenuId - 1; i++) {
		level += ' > li > ul';
		checkLevel.push(level);
	}
	checkLevel.forEach(function (level, i) {
		var submenu = [].slice.call($sel(level));
		if (submenu.length > 0) {
			submenuLevels.push(submenu);
		} else {
			return;
		}
	});

	// sorting submenus on levels
	for (var _i = submenuLevels.length - 1; _i >= 0; _i--) {
		if (_i - 1 >= 0) {
			for (var j = 0; j < submenuLevels[_i].length; j++) {
				for (var y = _i - 1; y >= 0; y--) {
					for (var k = 0; k < submenuLevels[y].length; k++) {
						if (submenuLevels[_i][j] === submenuLevels[y][k]) {
							var _ret = function () {
								var tempArray = [];
								submenuLevels[y].forEach(function (item) {
									tempArray.push(item);
								});
								tempArray.splice(k, 1);
								submenuLevels.splice(y, 1, tempArray);
								return 'break';
							}();

							if (_ret === 'break') break;
						}
					}
				}
			}
		}
	}
})();

var setSubmenusPositionX = function setSubmenusPositionX() {

	var toLeftSide = false,
	    troubleLevel = void 0,
	    amount = 0;

	submenuLevels.forEach(function (level, i) {
		level.forEach(function (submenu) {
			if (viewportX - 10 <= leftMenuPosition + submenu.clientWidth) {
				submenu.style.left = 'auto';
				submenu.style.right = '100%';
			} else {
				if (viewportX - 10 <= leftMenuPosition + submenu.clientWidth + relativeSubmenuPositionX) {
					submenu.style.left = 'auto';
					if (troubleLevel === undefined) {
						troubleLevel = i;
					}
					if (submenuLevels[troubleLevel].length > amount) {
						if (i >= 1) {
							submenu.style.right = 100 * (i + 1) + 0.5 * i + '%';
						} else submenu.style.right = 100 * (i + 1) + '%';
						amount++;
					} else {
						submenu.style.right = 100 + '%';
					}
				} else {
					submenu.style.right = 'auto';
					submenu.style.left = '100%';
				}
			}
		}); // submenu
		if (!(viewportX - 10 <= leftMenuPosition + level[0].clientWidth)) {
			if (viewportX - 10 <= leftMenuPosition + level[0].clientWidth + relativeSubmenuPositionX) {
				if (!toLeftSide) {
					relativeSubmenuPositionX -= level[0].clientWidth * (-1 - i);
				} else {
					relativeSubmenuPositionX -= level[0].clientWidth;
				}
			} else {
				relativeSubmenuPositionX += level[0].clientWidth;
			}
		}
	}); // level
};

var viewportY = window.innerHeight,
    viewportX = window.innerWidth;

var startItemPosition = 0;
var arrowEvent = function arrowEvent(thisArrow) {
	var visibleArea = window.innerHeight,
	    menuItems = $sel('#main-menu > .menu-item'),
	    menuItemHeight = menuItems[0].clientHeight,
	    amount = menuItems.length,
	    toLast = menuItemHeight * amount - visibleArea - 20;

	if (thisArrow.classList[1] == 'arrow-up') {
		deleteClass(arrowDown, 'disabled');
		if (startItemPosition < arrowUp.clientHeight - menuItemHeight * 2) {
			startItemPosition += menuItemHeight;
			for (var i = 0; i < amount; i++) {
				menuItems[i].style.top = startItemPosition + 'px';
			}
		} else {
			startItemPosition += menuItemHeight;
			for (var _i2 = 0; _i2 < amount; _i2++) {
				menuItems[_i2].style.top = startItemPosition + 'px';
			}
			addClass(thisArrow, 'disabled');
		}
	}
	if (thisArrow.classList[1] == 'arrow-down') {
		deleteClass(arrowUp, 'disabled');
		if (-startItemPosition <= toLast) {
			startItemPosition -= menuItemHeight;
			for (var _i3 = 0; _i3 < amount; _i3++) {
				menuItems[_i3].style.top = startItemPosition + 'px';
			}
		} else {
			startItemPosition -= menuItemHeight + 10;
			for (var _i4 = 0; _i4 < amount; _i4++) {
				menuItems[_i4].style.top = startItemPosition + 'px';
			}
			startItemPosition += 10;
			addClass(thisArrow, 'disabled');
		}
	}
	setSubmenusPositionY(true);
};

var someActionsHappen = function someActionsHappen() {
	alert('Something happens!');
};

var resetItemPosition = function resetItemPosition() {
	startItemPosition = 0;
	var menuItems = $sel('#main-menu > .menu-item'),
	    amount = menuItems.length;
	for (var i = 0; i < amount; i++) {
		menuItems[i].style.top = startItemPosition + 'px';
	}
	addClass(arrowUp, 'disabled');
	deleteClass(arrowDown, 'disabled');
};