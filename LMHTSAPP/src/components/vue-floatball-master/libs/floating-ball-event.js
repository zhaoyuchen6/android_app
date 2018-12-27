const FloatBallEvent = {}

FloatBallEvent.init = function (floatballContainObj, themeColor, positionValue) {
  let floatballContainObjParent = floatballContainObj.$el.parentNode
  let elData = floatballContainObj._data //data
  let floatingballParent = floatballContainObj.$el //组件html
  let floatballObj = floatballContainObj.$children[0] //
  let floatingballBox = floatballObj.$el //球
  let popoverNode = floatballContainObj.$children[1].$el //弹出框
  let toastparent = floatballContainObj.$children[2].$el //toast
  let toastNode = floatballContainObj.$children[2].$el.lastElementChild //toast
  let offsetDistanceObj = offset(floatballContainObjParent)
  let viewContentW = (offsetDistanceObj.left + floatballContainObjParent.offsetWidth) <= window.screen.width ? floatballContainObjParent.offsetWidth : window.screen.width
  let viewContentH = (offsetDistanceObj.top + floatballContainObjParent.offsetHeight) <= window.screen.height ? floatballContainObjParent.offsetHeight : window.screen.height
  let range
  let myTimeOut
  let fmtThemeColor = colorRgb(themeColor)
  let ballNum = floatballContainObj.$children[1].$el.childElementCount
  floatingballBox.appendChild(nodeToFragment(floatingballBox, 'init', fmtThemeColor))
  initBallPosition(positionValue)

  floatballObj.$on('mousedown', onDocumentMouseDown, false)
  floatballObj.$on('mouseenter', onDocumentMouseEnter, false)
  floatballObj.$on('mouseleave', onDocumentMouseLeave, false)
  // floatballObj.$on('touchstart', onDocumentTouchStart, false)
  floatballObj.$on('touchmove', onDocumentTouchMove, false)
  // floatballObj.$on('touchend', onDocumentTouchEnd, false)
  floatballObj.$on('tap', onTap, false)//
  // floatballObj.$on('longTap', onLongTap, false)//
  // floatballObj.$on('pressMove', onPressMove, false)//
  // floatballObj.$on('touchCancel', 'onTouchCancel', false)//

  // 创建DocumentFragment
  function nodeToFragment (node, eventType, fmtThemeColor) {
    let scaleValue = eventType === 'down' ? 'scale(1.2, 1.2)' : 'scale(1, 1)'
    let opacity = eventType === 'down' ? 0.3 : 0.1
    let flag = document.createDocumentFragment()
    let child = node.firstChild

    while (child) {
      addStyle(child)
      flag.appendChild(child)
      child = node.firstChild
    }

    function addStyle (node) {
      // 判断节点类型
      if (node.nodeType === 1 && node.className != "ball-badge") {
        opacity += 0.1
        node.style.transform = scaleValue
        node.style.background = 'rgba(' + fmtThemeColor + ',' + opacity + ')'
      }
    }
    return flag
  }

  // 初始化位置
  function initBallPosition (positionValue) {
    range = {
      minX: offsetDistanceObj.left,
      maxX: (offsetDistanceObj.left + floatballContainObjParent.offsetWidth) <= window.screen.width ? (offsetDistanceObj.left + viewContentW - floatingballParent.offsetWidth) : (window.screen.width - floatingballParent.offsetWidth),
      minY: offsetDistanceObj.top,
      maxY: (offsetDistanceObj.top + floatballContainObjParent.offsetHeight) <= window.screen.height ? (offsetDistanceObj.top + viewContentH - floatingballParent.offsetHeight) : (window.screen.height - floatingballParent.offsetHeight - 97)
    }
    let positionArr = positionValue.split(' ')
    let defaultOffsetMinX = (range.minX + 7) + 'px'
    let defaultOffsetMaxX = (range.maxX - 7) + 'px'
    let defaultOffsetMinY = (range.minY + 7) + 'px'
    let defaultOffsetMaxY = (range.maxY - 7) + 'px'

    let centerOffsetMaxY = (range.maxY - 7)/2 + 'px'
    let centerOffsetMaxX = (range.maxX - 7)/2 + 'px'

    for (let i = 0; i < positionArr.length; i++) {
      switch (positionArr[i]) {
        case 'top':
          floatingballParent.style.top = defaultOffsetMinY
          break
        case 'middal':
          floatingballParent.style.top = centerOffsetMaxY
          break
        case 'bottom':
          floatingballParent.style.top = defaultOffsetMaxY
          break
        case 'left':
          floatingballParent.style.left = defaultOffsetMinX
          break
        case 'center':
          floatingballParent.style.left = centerOffsetMaxX
          break
        case 'right':
          floatingballParent.style.left = defaultOffsetMaxX
          break

        // default:
        //   handleNumber(i, positionArr[i])
      }
    }

    currentBallPopover('mouse')

    // function handleNumber (index, positionNum) {
    //   let halfBoxWidth = floatingballParent.offsetWidth / 2
    //   let halfBoxHeight = floatingballParent.offsetHeight / 2

    //   positionNum = Number(positionNum)
    //   if (index === 0) {
    //     if (positionNum > 0 && positionNum < 100) {
    //       floatingballParent.style.top = offsetDistanceObj.top + (positionNum / 100) * (range.maxY + floatingballParent.offsetHeight) - halfBoxHeight + 'px'
    //     } else if (positionNum <= 0) {
    //       floatingballParent.style.top = defaultOffsetMinY
    //     } else {
    //       floatingballParent.style.top = defaultOffsetMaxY
    //     }
    //   } else {
    //     if (positionNum > 0 && positionNum < 100) {
    //       floatingballParent.style.left = offsetDistanceObj.left + (positionNum / 100) * (range.maxX + floatingballParent.offsetWidth) - halfBoxWidth + 'px'
    //     } else if (positionNum <= 0) {
    //       floatingballParent.style.left = defaultOffsetMinX
    //     } else {
    //       floatingballParent.style.left = defaultOffsetMaxX
    //     }
    //   }
    // }
  }

  // ballPopover current position
  function currentBallPopover (eventType) {
    let popoverStatus = elData.isShow ? 15 : 0
    popoverNode.style.opacity = elData.isShow ? 1 : 0
    popoverNode.style.width = popoverStatus + 'vw'
    popoverNode.style.height = popoverStatus + 'vw'
    popoverNode.style.minHeight = popoverStatus + 'vw'
    // popoverNode.style.background = 'rgba(' + fmtThemeColor + ',' + 0.65 + ')'
    let tempPopoverEventNum = computedPopoverNum() - 2
    // debugger;
    updateRange(eventType)

    let floatingballParentTop = Number(floatingballParent.style.top.replace(/px/, ''))
    let floatingballParentLeft = Number(floatingballParent.style.left.replace(/px/, ''))
    // 将页面分成四块，判断位置去显示相应的效果
    if(floatingballParentLeft < range.maxX/2){//在左半边屏幕
      // toastNode.style.left = -500 + 'px'
      toastNode.style.left = 50 + 'px'
      if(floatingballParentTop < range.maxY/3){//在左上半边屏幕
        popoverNode.style.transform = 'rotateZ(180deg)'//ZZ
        popoverNode.style.top = 2 + 'vw'
        popoverNode.style.left = 0 + 'vw'
        for(let i=0;i<ballNum;i++){
          popoverNode.children[i].children[0].style.transform = 'rotateY(0deg) rotatez('+ (180+90/(ballNum-1)*i) +'deg)'//
        }
      }else{//在左下半边屏幕
        popoverNode.style.top = -14 + 'vw'
        popoverNode.style.left = 0 + 'vw'
        popoverNode.style.transform = 'rotateY(180deg)'//
        for(let i=0;i<ballNum;i++){
          popoverNode.children[i].children[0].style.transform = 'rotateY(180deg) rotatez('+ (-90/(ballNum-1)*i) +'deg)'//
        }
      }
    }else{//在右半边屏幕
      toastNode.style.left = -410 + 'px'
      if(floatingballParentTop < range.maxY/3){//在右上半边屏幕
        popoverNode.style.transform = 'rotateZ(270deg)'//ZZ
        popoverNode.style.top = 0 + 'vw'
        popoverNode.style.left = -14 + 'vw'
        for(let i=0;i<ballNum;i++){
          popoverNode.children[i].children[0].style.transform = 'rotatez('+ (90 + 90/(ballNum-1)*i) +'deg)'//
        }
      }else{//在右下半边屏幕
        popoverNode.style.top = -14 + 'vw'
        popoverNode.style.left = -12 + 'vw'
        popoverNode.style.transform = 'rotateY(0deg)'//ZZ
        for(let i=0;i<ballNum;i++){
          popoverNode.children[i].children[0].style.transform = 'rotatez('+ (90/(ballNum-1)*i) +'deg)'//
        }
      }
    }
    //

    function computedPopoverNum () {
      return Math.ceil(elData.popoverEventsNum / 2)
    }
  }

  // 颜色转换
  function colorRgb (presentColor) {
    // rgb
    let rgbReg = /rgb\((.+)\)/
    // 十六进制
    let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
    let sColor = presentColor.toLowerCase()
    if (sColor && reg.test(sColor)) {
      if (sColor.length === 4) {
        let sColorNew = '#'
        for (let i = 1; i < 4; i += 1) {
          sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1))
        }
        sColor = sColorNew
      }
      // 处理六位的颜色值
      let sColorChange = []
      for (let i = 1; i < 7; i += 2) {
        sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2)))
      }
      return sColorChange.join(',')
    } else if (rgbReg.test(sColor)) {
      return RegExp.$1
    }
  }

  // 更新坐标
  function getPresentPosition (event, eventType) {
    let presentX = event.clientX - floatingballParent.offsetWidth / 2
    let presentY = event.clientY - floatingballParent.offsetHeight / 2

    updateRange(eventType)

    if (event.clientX <= range.minX) {
      presentX = range.minX
    }
    if (event.clientX >= range.maxX) {
      presentX = range.maxX
    }
    if (event.clientY <= range.minY) {
      presentY = range.minY
    }
    if (event.clientY >= range.maxY) {
      presentY = range.maxY
    }

    return {
      presentX: presentX,
      presentY: presentY
    }
  }

  function updateRange (eventType) {
    let tempCurrentMaxY = eventType === 'mouse' ? (window.screen.height - floatingballParent.offsetHeight - 97) : (window.screen.height - floatingballParent.offsetHeight)
    range = {
      minX: offsetDistanceObj.left,
      maxX: (offsetDistanceObj.left + floatballContainObjParent.offsetWidth) <= window.screen.width ? (offsetDistanceObj.left + viewContentW - floatingballParent.offsetWidth) : (window.screen.width - floatingballParent.offsetWidth),
      minY: (offsetDistanceObj.top - document.documentElement.scrollTop) > 0 ? (offsetDistanceObj.top - document.documentElement.scrollTop) : 0,
      maxY: (offsetDistanceObj.top + floatballContainObjParent.offsetHeight) <= window.screen.height ? (offsetDistanceObj.top + viewContentH - floatingballParent.offsetHeight) : ((offsetDistanceObj.top + floatballContainObjParent.offsetHeight - window.screen.height) > document.documentElement.scrollTop ? tempCurrentMaxY : (offsetDistanceObj.top + floatballContainObjParent.offsetHeight - document.documentElement.scrollTop - floatingballParent.offsetHeight))
    }
  }

  // 获取实际的offset
  function offset (curEle) {
    let totalLeft = null
    let totalTop = null
    let par = curEle.offsetParent

    // 首先加自己本身的左偏移和上偏移
    totalLeft += curEle.offsetLeft
    totalTop += curEle.offsetTop

    // 只要没有找到body，我们就把父级参照物的边框和偏移也进行累加
    while (par) {
      if (navigator.userAgent.indexOf('MSIE 8.0') === -1) {
        // 累加父级参照物的边框
        totalLeft += par.clientLeft
        totalTop += par.clientTop
      }

      // 累加父级参照物本身的偏移
      totalLeft += par.offsetLeft
      totalTop += par.offsetTop
      par = par.offsetParent
    }

    return {
      left: totalLeft,
      top: totalTop
    }
  }

  // PC端
  function onDocumentMouseDown (event) {
    event.preventDefault()
    if (elData.isShow) {
      elData.isShow = false
    } else {
      elData.isShow = true
    }
    currentBallPopover('mouse')

    floatingballBox.appendChild(nodeToFragment(floatingballBox, 'down', fmtThemeColor))

    document.addEventListener('mousemove', onDocumentMouseMove, false)
    floatballObj.$on('mouseup', onDocumentMouseUp, false)
  }

  function onDocumentMouseMove (event) {
    event.preventDefault()
    if (elData.isShow) {
      elData.isShow = false
      popoverNode.style.opacity = 0
      popoverNode.style.width = 0
      popoverNode.style.minHeight = 0
    }

    let presentPosition = getPresentPosition(event, 'mouse')

    floatingballParent.style.left = presentPosition.presentX + 'px'
    floatingballParent.style.top = presentPosition.presentY + 'px'
  }

  function onDocumentMouseEnter (event) {
    event.preventDefault()
    floatingballBox.appendChild(nodeToFragment(floatingballBox, 'down', fmtThemeColor))
  }

  function onDocumentMouseLeave (event) {
    event.preventDefault()
    floatingballBox.appendChild(nodeToFragment(floatingballBox, 'up', fmtThemeColor))
  }

  function onDocumentMouseUp (event) {
    floatingballBox.appendChild(nodeToFragment(floatingballBox, 'up', fmtThemeColor))
    document.removeEventListener('mousemove', onDocumentMouseMove)
    floatballObj.$off('mouseup', onDocumentMouseUp)
  }

  // 移动端
  function onDocumentTouchStart (event) {
    // let event = event
      event.preventDefault()
      if (elData.isShow) {
        elData.isShow = false
        popoverNode.classList.remove("floating-ball-popover-trans")
      } else {
        elData.isShow = true
        popoverNode.classList.add("floating-ball-popover-trans")
      }
      currentBallPopover('touch')

      floatingballBox.appendChild(nodeToFragment(floatingballBox, 'down', fmtThemeColor))

      let touch = event.touches[0]
      let presentPosition = getPresentPosition(touch, 'touch')

      floatingballParent.style.left = presentPosition.presentX + 'px'
      floatingballParent.style.top = presentPosition.presentY + 'px'

  }

  function onDocumentTouchMove (event) {
    event.preventDefault()
    if (elData.isShow) {
      elData.isShow = false
      // popoverNode.className =  'floating-ball-popover'
      popoverNode.classList.remove("floating-ball-popover-trans")
      popoverNode.style.opacity = 0
      popoverNode.style.width = 0
      popoverNode.style.minHeight = 0
      top: 0;
      left: 0;
    }
    let touch = event.touches[0]
    let presentPosition = getPresentPosition(touch, 'touch')

    floatingballParent.style.left = presentPosition.presentX + 'px'
    floatingballParent.style.top = presentPosition.presentY + 'px'

    // 给toast定位
    let floatingballParentLeft = Number(floatingballParent.style.left.replace(/px/, ''))
    if(floatingballParentLeft > range.maxX/2){//在right半边屏幕
      toastNode.style.left = -410 + 'px'
    }else{
      toastNode.style.left = 50 + 'px'
    }
  }
  // 拖动结束
  function onDocumentTouchEnd (event) {
    // event.preventDefault()
    floatingballBox.appendChild(nodeToFragment(floatingballBox, 'up', fmtThemeColor))
  }
  //点击
  function onTap(event){
    // alert('tap-move');
    floatingballBox.appendChild(nodeToFragment(floatingballBox, 'down', fmtThemeColor))
    if (elData.isShow) {
      setTimeout(function(){
        elData.isShow = false
        popoverNode.classList.remove("floating-ball-popover-trans")
      },300)
    } else {
      elData.isShow = true
      popoverNode.classList.add("floating-ball-popover-trans")
      currentBallPopover('touch')
    }
    // let touch = event.changedTouches[0]
    // alert(JSON.stringify(touch))
    // let presentPosition = getPresentPosition(touch, 'touch')

    // floatingballParent.style.left = presentPosition.presentX + 'px'
    // floatingballParent.style.top = presentPosition.presentY + 'px'
    // setTimeout(function())
    // floatingballBox.appendChild(nodeToFragment(floatingballBox, 'up', fmtThemeColor))
    setTimeout(function(){
      currentBallPopover('touch')
      floatingballBox.appendChild(nodeToFragment(floatingballBox, 'up', fmtThemeColor))
    },700)
  }
  // 长按
  function onLongTap(event){
    // console.log('onLongTap')
    if (elData.isShow) {
      elData.isShow = false
      popoverNode.style.opacity = 0
      popoverNode.style.width = 0
      popoverNode.style.minHeight = 0
    }
    let touch = event
    let presentPosition = getPresentPosition(touch, 'touch')

    floatingballParent.style.left = presentPosition.presentX + 'px'
    floatingballParent.style.top = presentPosition.presentY + 'px'
  }
  // 拖动
  function onPressMove(event){
    // elData.isMove == true
    if(true){
      let touch = event.changedTouches[0]
      // console.log(touch);
      let presentPosition = getPresentPosition(touch, 'touch')
      floatingballParent.style.left = presentPosition.presentX + 'px'
      floatingballParent.style.top = presentPosition.presentY + 'px'
    }
    // elData.isShow = true
  }
  function onTouchCancel(){
    alert('onTouchCancel')
    elData.isMove == false
  }
}

export default FloatBallEvent
