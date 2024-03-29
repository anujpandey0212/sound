!function(t, n) {
    "use strict";
    if (t.zepto && !t.fn.removeData)
        throw new ReferenceError("Zepto is loaded without the data module.");
    t.fn.noUiSlider = function(e) {
        function a(n, e, a) {
            t.isArray(n) || (n = [n]),
            t.each(n, function(t, n) {
                "function" == typeof n && n.call(e, a)
            })
        }
        function i(n) {
            return n instanceof t || t.zepto && t.zepto.isZ(n)
        }
        function o(e) {
            e.preventDefault();
            var a, i, o = 0 === e.type.indexOf("touch"), r = 0 === e.type.indexOf("mouse"), s = 0 === e.type.indexOf("pointer"), l = e;
            return 0 === e.type.indexOf("MSPointer") && (s = !0),
            e.originalEvent && (e = e.originalEvent),
            o && (a = e.changedTouches[0].pageX,
            i = e.changedTouches[0].pageY),
            (r || s) && (s || window.pageXOffset !== n || (window.pageXOffset = document.documentElement.scrollLeft,
            window.pageYOffset = document.documentElement.scrollTop),
            a = e.clientX + window.pageXOffset,
            i = e.clientY + window.pageYOffset),
            t.extend(l, {
                x: a,
                y: i
            })
        }
        function r(n, e, a, i, r) {
            return n = n.replace(/\s/g, x + " ") + x,
            r ? (r > 1 && (i = t.extend(e, i)),
            e.on(n, t.proxy(a, i))) : (i.handler = a,
            e.on(n, t.proxy(function(t) {
                return this.target.is('[class*="noUi-state-"], [disabled]') ? !1 : void this.handler(o(t))
            }, i)))
        }
        function s(t) {
            return !isNaN(parseFloat(t)) && isFinite(t)
        }
        function l(t) {
            return parseFloat(this.style[t])
        }
        function d(n, e) {
            function a(t) {
                return i(t) || "string" == typeof t || t === !1
            }
            var o = {
                handles: {
                    r: !0,
                    t: function(t) {
                        return t = parseInt(t, 10),
                        1 === t || 2 === t
                    }
                },
                range: {
                    r: !0,
                    t: function(t, n, e) {
                        return 2 !== t.length ? !1 : (t = [parseFloat(t[0]), parseFloat(t[1])],
                        s(t[0]) && s(t[1]) ? "range" === e && t[0] === t[1] ? !1 : t[1] < t[0] ? !1 : (n[e] = t,
                        !0) : !1)
                    }
                },
                start: {
                    r: !0,
                    t: function(n, e, a) {
                        return 1 === e.handles ? (t.isArray(n) && (n = n[0]),
                        n = parseFloat(n),
                        e.start = [n],
                        s(n)) : this.parent.range.t(n, e, a)
                    }
                },
                connect: {
                    t: function(t, n) {
                        return t === !0 || t === !1 || "lower" === t && 1 === n.handles || "upper" === t && 1 === n.handles
                    }
                },
                orientation: {
                    t: function(t) {
                        return "horizontal" === t || "vertical" === t
                    }
                },
                margin: {
                    r: !0,
                    t: function(t, n, e) {
                        return t = parseFloat(t),
                        n[e] = t,
                        s(t)
                    }
                },
                serialization: {
                    r: !0,
                    t: function(n, e) {
                        if (n.resolution)
                            switch (n.resolution) {
                            case 1:
                            case .1:
                            case .01:
                            case .001:
                            case 1e-4:
                            case 1e-5:
                                break;
                            default:
                                return !1
                            }
                        else
                            e.serialization.resolution = .01;
                        return n.mark ? "." === n.mark || "," === n.mark : (e.serialization.mark = ".",
                        n.to ? 1 === e.handles ? (t.isArray(n.to) || (n.to = [n.to]),
                        e.serialization.to = n.to,
                        a(n.to[0])) : 2 === n.to.length && a(n.to[0]) && a(n.to[1]) : !1)
                    }
                },
                slide: {
                    t: function(t) {
                        return "function" == typeof t
                    }
                },
                set: {
                    t: function(t, n) {
                        return this.parent.slide.t(t, n)
                    }
                },
                step: {
                    t: function(t, n, e) {
                        return this.parent.margin.t(t, n, e)
                    }
                },
                init: function() {
                    var n = this;
                    return t.each(n, function(t, e) {
                        e.parent = n
                    }),
                    delete this.init,
                    this
                }
            }
              , r = o.init();
            t.each(r, function(t, a) {
                if (a.r && !n[t] && 0 !== n[t] || (n[t] || 0 === n[t]) && !a.t(n[t], n, t))
                    throw console && console.log && console.group && (console.group("Invalid noUiSlider initialisation:"),
                    console.log("Option:	", t),
                    console.log("Value:	", n[t]),
                    console.log("Slider:	", e[0]),
                    console.groupEnd()),
                    new RangeError("noUiSlider")
            })
        }
        function u(t, n) {
            return Math.round(t / n) * n
        }
        function c(t, n) {
            return t = t.toFixed(n.data("decimals")),
            t.replace(".", n.data("mark"))
        }
        function h(t, n, e) {
            var a, i = t.data("nui").options, o = t.data("nui").base.data("handles"), r = t.data("nui").style;
            return s(n) ? n === t[0].gPct(r) ? !1 : (n = 0 > n ? 0 : n > 100 ? 100 : n,
            i.step && !e && (n = u(n, k.from(i.range, i.step))),
            n === t[0].gPct(r) ? !1 : t.siblings("." + C[1]).length && !e && o && (t.data("nui").number ? (a = o[0][0].gPct(r) + i.margin,
            n = a > n ? a : n) : (a = o[1][0].gPct(r) - i.margin,
            n = n > a ? a : n),
            n === t[0].gPct(r)) ? !1 : (0 === t.data("nui").number && n > 95 ? t.addClass(C[13]) : t.removeClass(C[13]),
            t.css(r, n + "%"),
            t.data("store").val(c(k.is(i.range, n), t.data("nui").target)),
            !0)) : !1
        }
        function f(e, a) {
            var o = e.data("nui").number
              , s = {
                target: e.data("nui").target,
                options: e.data("nui").options,
                handle: e,
                i: o
            };
            return i(a.to[o]) ? (r("change blur", a.to[o], O[0], s, 2),
            r("change", a.to[o], s.options.set, s.target, 1),
            a.to[o]) : "string" == typeof a.to[o] ? t('<input type="hidden" name="' + a.to[o] + '">').appendTo(e).addClass(C[3]).change(O[1]) : a.to[o] === !1 ? {
                val: function(t) {
                    return t === n ? this.handleElement.data("nui-val") : void this.handleElement.data("nui-val", t)
                },
                hasClass: function() {
                    return !1
                },
                handleElement: e
            } : void 0
        }
        function p(t) {
            var n = this.base
              , e = n.data("style")
              , i = t.x - this.startEvent.x
              , o = "left" === e ? n.width() : n.height();
            "top" === e && (i = t.y - this.startEvent.y),
            i = this.position + 100 * i / o,
            h(this.handle, i),
            a(n.data("options").slide, n.data("target"))
        }
        function g() {
            var n = this.base
              , e = this.handle;
            e.children().removeClass(C[4]),
            E.off(P.move),
            E.off(P.end),
            t("body").off(x),
            n.data("target").change(),
            a(e.data("nui").options.set, n.data("target"))
        }
        function v(n) {
            var e = this.handle
              , a = e[0].gPct(e.data("nui").style);
            e.children().addClass(C[4]),
            r(P.move, E, p, {
                startEvent: n,
                position: a,
                base: this.base,
                target: this.target,
                handle: e
            }),
            r(P.end, E, g, {
                base: this.base,
                target: this.target,
                handle: e
            }),
            t("body").on("selectstart" + x, function() {
                return !1
            })
        }
        function m(t) {
            t.stopPropagation(),
            g.call(this)
        }
        function b(t) {
            if (!this.base.find("." + C[4]).length) {
                var n, e, i, o = this.base, r = this.handles, s = o.data("style"), l = t["left" === s ? "x" : "y"], d = "left" === s ? o.width() : o.height(), u = {
                    handles: [],
                    base: {
                        left: o.offset().left,
                        top: o.offset().top
                    }
                };
                for (n = 0; n < r.length; n++)
                    u.handles.push({
                        left: r[n].offset().left,
                        top: r[n].offset().top
                    });
                i = 1 === r.length ? 0 : (u.handles[0][s] + u.handles[1][s]) / 2,
                e = 1 === r.length || i > l ? r[0] : r[1],
                o.addClass(C[5]),
                setTimeout(function() {
                    o.removeClass(C[5])
                }, 300),
                h(e, 100 * (l - u.base[s]) / d),
                a([e.data("nui").options.slide, e.data("nui").options.set], o.data("target")),
                o.data("target").change()
            }
        }
        function y(n) {
            return this.each(function(e, a) {
                a = t(a),
                a.addClass(C[6]);
                var i, o, s, u, c = t("<div/>").appendTo(a), p = [], g = {
                    base: S.base,
                    origin: [S.origin.concat([C[1] + C[7]]), S.origin.concat([C[1] + C[8]])],
                    handle: [S.handle.concat([C[2] + C[7]]), S.handle.concat([C[2] + C[8]])]
                };
                for (n = t.extend({
                    handles: 2,
                    margin: 0,
                    orientation: "horizontal"
                }, n) || {},
                n.serialization || (n.serialization = {
                    to: [!1, !1],
                    resolution: .01,
                    mark: "."
                }),
                d(n, a),
                n.S = n.serialization,
                n.connect ? "lower" === n.connect ? (g.base.push(C[9], C[9] + C[7]),
                g.origin[0].push(C[12])) : (g.base.push(C[9] + C[8], C[12]),
                g.origin[0].push(C[9])) : g.base.push(C[12]),
                o = "vertical" === n.orientation ? "top" : "left",
                s = n.S.resolution.toString().split("."),
                s = "1" === s[0] ? 0 : s[1].length,
                "vertical" === n.orientation ? g.base.push(C[10]) : g.base.push(C[11]),
                c.addClass(g.base.join(" ")).data("target", a),
                a.data({
                    base: c,
                    mark: n.S.mark,
                    decimals: s
                }),
                i = 0; i < n.handles; i++)
                    u = t("<div><div/></div>").appendTo(c),
                    u.addClass(g.origin[i].join(" ")),
                    u.children().addClass(g.handle[i].join(" ")),
                    r(P.start, u.children(), v, {
                        base: c,
                        target: a,
                        handle: u
                    }),
                    r(P.end, u.children(), m, {
                        base: c,
                        target: a,
                        handle: u
                    }),
                    u.data("nui", {
                        target: a,
                        decimals: s,
                        options: n,
                        base: c,
                        style: o,
                        number: i
                    }).data("store", f(u, n.S)),
                    u[0].gPct = l,
                    p.push(u),
                    h(u, k.to(n.range, n.start[i]));
                c.data({
                    options: n,
                    handles: p,
                    style: o
                }),
                a.data({
                    handles: p
                }),
                r(P.end, c, b, {
                    base: c,
                    target: a,
                    handles: p
                })
            })
        }
        function w() {
            var n = [];
            return t.each(t(this).data("handles"), function(t, e) {
                n.push(e.data("store").val())
            }),
            1 === n.length ? n[0] : n
        }
        function U(e, i) {
            return e === n ? w.call(this) : (i = i === !0 ? {
                trigger: !0
            } : i || {},
            t.isArray(e) || (e = [e]),
            this.each(function(o, r) {
                r = t(r),
                t.each(t(this).data("handles"), function(o, s) {
                    if (null !== e[o] && e[o] !== n) {
                        var l, d, u, f = s.data("nui").options.range, p = e[o];
                        i.trusted = !0,
                        (i.trusted === !1 || 1 === e.length) && (i.trusted = !1),
                        2 === e.length && t.inArray(null, e) >= 0 && (i.trusted = !1),
                        "string" === t.type(p) && (p = p.replace(",", ".")),
                        p = k.to(f, parseFloat(p)),
                        u = h(s, p, i.trusted),
                        i.trigger && a(s.data("nui").options.set, r),
                        u || (l = s.data("store").val(),
                        d = k.is(f, s[0].gPct(s.data("nui").style)),
                        l !== d && s.data("store").val(c(d, r)))
                    }
                })
            }))
        }
        var x = ".nui"
          , E = t(document)
          , P = {
            start: "mousedown touchstart",
            move: "mousemove touchmove",
            end: "mouseup touchend"
        }
          , z = t.fn.val
          , C = ["noUi-base", "noUi-origin", "noUi-handle", "noUi-input", "noUi-active", "noUi-state-tap", "noUi-target", "-lower", "-upper", "noUi-connect", "noUi-vertical", "noUi-horizontal", "noUi-background", "noUi-z-index"]
          , S = {
            base: [C[0]],
            origin: [C[1]],
            handle: [C[2]]
        }
          , k = {
            to: function(t, n) {
                return n = t[0] < 0 ? n + Math.abs(t[0]) : n - t[0],
                100 * n / this.len(t)
            },
            from: function(t, n) {
                return 100 * n / this.len(t)
            },
            is: function(t, n) {
                return n * this.len(t) / 100 + t[0]
            },
            len: function(t) {
                return t[0] > t[1] ? t[0] - t[1] : t[1] - t[0]
            }
        }
          , O = [function() {
            this.target.val([this.i ? null : this.val(), this.i ? this.val() : null], {
                trusted: !1
            })
        }
        , function(t) {
            t.stopPropagation()
        }
        ];
        return window.navigator.pointerEnabled ? P = {
            start: "pointerdown",
            move: "pointermove",
            end: "pointerup"
        } : window.navigator.msPointerEnabled && (P = {
            start: "MSPointerDown",
            move: "MSPointerMove",
            end: "MSPointerUp"
        }),
        t.fn.val = function() {
            return this.hasClass(C[6]) ? U.apply(this, arguments) : z.apply(this, arguments)
        }
        ,
        y.call(this, e)
    }
}($);
(function() {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        }
        ;
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        }
        ;
}());
var shiftDown = false;
var setShiftDown = function(event) {
    if (event.keyCode === 16 || event.charCode === 16) {
        shiftDown = true;
    }
};
var setShiftUp = function(event) {
    if (event.keyCode === 16 || event.charCode === 16) {
        shiftDown = false;
    }
};
function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}
$(document).on("keydown", function(e) {
    setShiftDown(e);
});
$(document).on("keyup", function(e) {
    setShiftUp(e);
});

function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}
function Demo(settings) {
    var self = this;
    for (var name in settings) {
        this[name] = settings[name];
    }
    this.ui = typeof this.ui === "undefined" ? {} : this.ui;
    this.shiftDown = false;
    this.setShiftDown = function(event) {
        if (event.keyCode === 16 || event.charCode === 16) {
            self.shiftDown = true;
        }
    }
    ;
    this.setShiftUp = function(event) {
        if (event.keyCode === 16 || event.charCode === 16) {
            self.shiftDown = false;
        }
    }
    ;
    var params={
        f1:this.ui.f1.value,
        f2:this.ui.f2.value,
        amplitude:this.ui.amplitude2.value,
        zoom:this.ui.zoom.value,
        sound:this.ui.sound.value,
        overlay:this.ui.overlay.value,
        background: '#112d4c',
    };
    const pane = new Tweakpane.Pane()

    const tool = pane.addFolder({
        title: 'Basic',
      });

      tool.addInput(params, 'f1',{
          min:this.ui.f1.range[0],
          max:this.ui.f1.range[1],
          step:1
      }).on("change",(ev)=>{
        this.ui.f1.value = ev.value
        this.sendEvent(this.ui.f1.title, 'value changed', window.location.pathname);
        this.update("f1");
      });

      tool.addInput(params,'f2',{
          min:this.ui.f2.range[0],
          max:this.ui.f2.range[1],
          step:1
      }).on("change",(ev)=>{
        this.ui.f2.value = ev.value
        this.sendEvent(this.ui.f2.title, 'value changed', window.location.pathname);
        this.update("f2");
      });

      tool.addInput(params,"amplitude",{
          min:this.ui.amplitude2.range[0],
          max:this.ui.amplitude2.range[1],
      }).on("change",(ev)=>{
        this.ui.amplitude2.value = ev.value;
        this.sendEvent(this.ui.amplitude2.title, 'value changed', window.location.pathname);
        this.update("amplitude2");
      });

      tool.addInput(params,"zoom",{
          min:this.ui.zoom.range[0],
          max:this.ui.zoom.range[1],
          step:1,
      }).on("change",(ev)=>{
          var change=ev.value-this.ui.zoom.value;
          this.ui.zoom.value=ev.value;
        if(change<0){
            change=Math.abs(change);
            this.sendEvent(this.ui.zoom.title, 'decrement: -' + change, window.location.pathname);
            console.log("hey");
        }
        else{
            this.sendEvent(this.ui.zoom.title, 'increment: +' + change, window.location.pathname);
        }
        
        // this.sendEvent(this.ui.zoom.title, 'value changed', window.location.pathname);
        this.update("zoom");
      });

      tool.addInput(params,"sound").on("change",(ev)=>{
        this.ui.sound.value = ev.value;
        this.sendEvent(this.ui.sound.title, 'value changed', window.location.pathname);
        this.update("sound");
      });

      tool.addInput(params,"overlay").on("change",(ev)=>{
        this.ui.overlay.value = ev.value;
        this.sendEvent(this.ui.overlay.title, 'value changed', window.location.pathname);
        this.update("overlay");
      });

      tool.addInput(params,"background").on("change",(ev)=>{
          console.log(ev.value);
          var body=document.querySelector("body")
          body.style.background=ev.value;
      });

    
    $("body").on('click', '#ui-container a', function(e) {
        self.sendEvent($(this).html(), 'click', window.location.pathname);
    });
    $(document).on("keydown", function(e) {
        self.setShiftDown(e);
    });
    $(document).on("keyup", function(e) {
        self.setShiftUp(e);
    });
    this.sendEvent = function(category, action, label, value) {
        if (window.location.host == 'academo.org') {
            ga('send', 'event', category, action, label, value);
        }
    }
    this.init();
}


