var $wrapper = document.getElementById('wrapper')
var $scrollDown = document.querySelector('.scroll-down')
var $links = document.querySelector('.links')

var vh = window.innerHeight

/* STORE SOME KEY LOCATIONS */

/* ~ le fin ~
 * The point where you cannot scroll down any further.
 */
var fin = $wrapper.clientHeight - vh + $links.clientHeight

function calculateAnimations() {
  return [
    /* animate Ks */
    { range: [-1, fin * 0.5],   selector: '.k', type: 'scale', style: 'transform:translateY', from: 0, to: 25, unit: 'px' },
    { range: [fin * 0.5, fin],  selector: '.k', type: 'scale', style: 'transform:translateY', from: 25, to: 0, unit: 'px' },
    { range: [fin * 0.4, fin],  selector: '.k', type: 'change', style: 'color', to: '#ffb515' },

    /* animate Us */
    { range: [-1, fin * 0.5],   selector: '.u', type: 'scale', style: 'transform:scaleX', from: 1, to: 0.5 },
    { range: [-1, fin * 0.5],   selector: '.u', type: 'scale', style: 'transform:scaleY', from: 1, to: 0.5 },
    { range: [fin * 0.5, fin],  selector: '.u', type: 'scale', style: 'transform:scaleX', from: 0.5, to: 1 },
    { range: [fin * 0.5, fin],  selector: '.u', type: 'scale', style: 'transform:scaleY', from: 0.5, to: 1 },
    { range: [fin * 0.3, fin],  selector: '.u', type: 'change', style: 'color', to: '#1fd1ec' },

    /* animate Os */
    { range: [fin * 0.1, fin],  selector: '.o', type: 'randomizeColor' },

    /* animate Ps */
    { range: [-1, fin * 0.5],   selector: '.p', type: 'scale', style: 'transform:rotateX', from: 0, to: 90, unit: 'deg' },
    { range: [fin * 0.5, fin],  selector: '.p', type: 'scale', style: 'transform:rotateX', from: 90, to: 0, unit: 'deg' },
    { range: [fin * 0.3, fin],  selector: '.p', type: 'change', style: 'color', to: '#8382f9' },

    /* animate Is */
    { range: [-1, fin * 0.5],   selector: '.i', type: 'scale', style: 'transform:rotateZ', from: 0, to: -180, unit: 'deg' },
    { range: [fin * 0.5, fin],  selector: '.i', type: 'scale', style: 'transform:rotateZ', from: -180, to: -360, unit: 'deg' },
    { range: [fin * 0.4, fin],  selector: '.i', type: 'change', style: 'color', to: '#c05bdb' },

    /* animate line */
    { range: [-1, fin],         selector: '.line', type: 'scale', style: 'width', from: 0.01, to: 50, unit: '%' },
    { range: [-1, fin],         selector: '.line', type: 'scale', style: 'opacity', from: 0, to: 1 },

    /* animate arrow */
    { range: [0.6 * fin, fin], selector: '.scroll-down', type: 'scale', style: 'opacity', from: 1, to: 0 },
    { range: [fin - 30, fin],   selector: '.scroll-down', type: 'change', style: 'display', to: 'none' },

    /* animate links */
    { range: [0.8 * fin, fin], selector: '.links', type: 'scale', style: 'opacity', from: 0, to: 1 }
  ]
}

// Instantiate choreographer.
var choreographer = new Choreographer({
  animations: calculateAnimations(),
  customFunctions: {
    randomizeColor: function(data) {
      var chars = '0123456789abcdef'.split('')
      var hex = '#'

      while (hex.length < 7) {
        hex += chars[Math.round(Math.random() * (chars.length - 1))]
      }

      data.node.style.color = hex
    }
  }
})

function animate() {
  var scrollPosition = ($wrapper.getBoundingClientRect().top - $wrapper.offsetTop) * -1
  choreographer.runAnimationsAt(scrollPosition)
}

document.body.addEventListener('scroll', animate)

animate()

window.addEventListener('resize', function() {
  choreographer.updateAnimations(calculateAnimations())
})