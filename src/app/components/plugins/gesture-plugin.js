module.exports = !(function (t, e) {
  'object' == typeof exports && 'undefined' != typeof module
    ? (module.exports = e())
    : 'function' == typeof define && define.amd
    ? define(e)
    : ((t = t || self).rexgesturesplugin = e());
})(this, function () {
  function h(t) {
    return (h =
      'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t &&
              'function' == typeof Symbol &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? 'symbol'
              : typeof t;
          })(t);
  }
  function a(t, e) {
    if (!(t instanceof e))
      throw new TypeError('Cannot call a class as a function');
  }
  function n(t, e) {
    for (var i = 0; i < e.length; i++) {
      var n = e[i];
      (n.enumerable = n.enumerable || !1),
        (n.configurable = !0),
        'value' in n && (n.writable = !0),
        Object.defineProperty(t, n.key, n);
    }
  }
  function t(t, e, i) {
    return e && n(t.prototype, e), i && n(t, i), t;
  }
  function e(t, e) {
    if ('function' != typeof e && null !== e)
      throw new TypeError('Super expression must either be null or a function');
    (t.prototype = Object.create(e && e.prototype, {
      constructor: { value: t, writable: !0, configurable: !0 },
    })),
      e && i(t, e);
  }
  function u(t) {
    return (u = Object.setPrototypeOf
      ? Object.getPrototypeOf
      : function (t) {
          return t.__proto__ || Object.getPrototypeOf(t);
        })(t);
  }
  function i(t, e) {
    return (i =
      Object.setPrototypeOf ||
      function (t, e) {
        return (t.__proto__ = e), t;
      })(t, e);
  }
  function c(t) {
    if (void 0 === t)
      throw new ReferenceError(
        "this hasn't been initialised - super() hasn't been called",
      );
    return t;
  }
  function l(r) {
    var o = (function () {
      if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
      if (Reflect.construct.sham) return !1;
      if ('function' == typeof Proxy) return !0;
      try {
        return (
          Date.prototype.toString.call(
            Reflect.construct(Date, [], function () {}),
          ),
          !0
        );
      } catch (t) {
        return !1;
      }
    })();
    return function () {
      var t,
        e,
        i,
        n = u(r);
      if (o) {
        var s = u(this).constructor;
        t = Reflect.construct(n, arguments, s);
      } else t = n.apply(this, arguments);
      return (
        (e = this),
        !(i = t) || ('object' != typeof i && 'function' != typeof i) ? c(e) : i
      );
    };
  }
  function s(t, e, i) {
    return (s =
      'undefined' != typeof Reflect && Reflect.get
        ? Reflect.get
        : function (t, e, i) {
            var n = (function (t, e) {
              for (
                ;
                !Object.prototype.hasOwnProperty.call(t, e) &&
                null !== (t = u(t));

              );
              return t;
            })(t, e);
            if (n) {
              var s = Object.getOwnPropertyDescriptor(n, e);
              return s.get ? s.get.call(i) : s.value;
            }
          })(t, e, i || t);
  }
  var r = (function () {
      function i(t) {
        a(this, i), (this.scene = t);
      }
      return (
        t(i, null, [
          {
            key: 'register',
            value: function (t, e) {
              i.prototype[t] = e;
            },
          },
        ]),
        i
      );
    })(),
    o = {
      setEventEmitter: function (t, e) {
        return (
          void 0 === e && (e = Phaser.Events.EventEmitter),
          (this._privateEE = void 0 === t),
          (this._eventEmitter = this._privateEE ? new e() : t),
          this
        );
      },
      destroyEventEmitter: function () {
        return (
          this._eventEmitter &&
            this._privateEE &&
            this._eventEmitter.shutdown(),
          this
        );
      },
      getEventEmitter: function () {
        return this._eventEmitter;
      },
      on: function () {
        return (
          this._eventEmitter &&
            this._eventEmitter.on.apply(this._eventEmitter, arguments),
          this
        );
      },
      once: function () {
        return (
          this._eventEmitter &&
            this._eventEmitter.once.apply(this._eventEmitter, arguments),
          this
        );
      },
      off: function () {
        return (
          this._eventEmitter &&
            this._eventEmitter.off.apply(this._eventEmitter, arguments),
          this
        );
      },
      emit: function (t) {
        return (
          this._eventEmitter &&
            t &&
            this._eventEmitter.emit.apply(this._eventEmitter, arguments),
          this
        );
      },
      addListener: function () {
        return (
          this._eventEmitter &&
            this._eventEmitter.addListener.apply(this._eventEmitter, arguments),
          this
        );
      },
      removeListener: function () {
        return (
          this._eventEmitter &&
            this._eventEmitter.removeListener.apply(
              this._eventEmitter,
              arguments,
            ),
          this
        );
      },
      removeAllListeners: function () {
        return (
          this._eventEmitter &&
            this._eventEmitter.removeAllListeners.apply(
              this._eventEmitter,
              arguments,
            ),
          this
        );
      },
      listenerCount: function () {
        return this._eventEmitter
          ? this._eventEmitter.listenerCount.apply(
              this._eventEmitter,
              arguments,
            )
          : 0;
      },
      listeners: function () {
        return this._eventEmitter
          ? this._eventEmitter.listeners.apply(this._eventEmitter, arguments)
          : [];
      },
    },
    v = Phaser.Utils.Objects.GetValue,
    d = (function () {
      function i(t, e) {
        a(this, i),
          (this.parent = t),
          (this._isRunning = !1),
          (this.tickingState = !1),
          this.setEventEmitter(v(e, 'eventEmitter', void 0)),
          this.setTickingMode(v(e, 'tickingMode', 1));
      }
      return (
        t(i, [
          {
            key: 'boot',
            value: function () {
              2 !== this.tickingMode ||
                this.tickingState ||
                this.startTicking();
            },
          },
          {
            key: 'shutdown',
            value: function () {
              this.destroyEventEmitter(),
                this.tickingState && this.stopTicking();
            },
          },
          {
            key: 'setTickingMode',
            value: function (t) {
              'string' == typeof t && (t = p[t]), (this.tickingMode = t);
            },
          },
          {
            key: 'startTicking',
            value: function () {
              this.tickingState = !0;
            },
          },
          {
            key: 'stopTicking',
            value: function () {
              this.tickingState = !1;
            },
          },
          {
            key: 'start',
            value: function () {
              return (this.isRunning = !0), this;
            },
          },
          {
            key: 'pause',
            value: function () {
              return (this.isRunning = !1), this;
            },
          },
          {
            key: 'resume',
            value: function () {
              return (this.isRunning = !0), this;
            },
          },
          {
            key: 'stop',
            value: function () {
              return (this.isRunning = !1), this;
            },
          },
          {
            key: 'complete',
            value: function () {
              (this.isRunning = !1), this.emit('complete', this.parent, this);
            },
          },
          {
            key: 'isRunning',
            get: function () {
              return this._isRunning;
            },
            set: function (t) {
              this._isRunning !== t &&
                ((this._isRunning = t),
                1 === this.tickingMode &&
                  t != this.tickingState &&
                  (t ? this.startTicking() : this.stopTicking()));
            },
          },
        ]),
        i
      );
    })();
  Object.assign(d.prototype, o);
  function f(t) {
    return t instanceof g;
  }
  var p = { no: 0, lazy: 1, always: 2 },
    g = Phaser.Scene,
    m = Phaser.Utils.Objects.GetValue,
    k = (function () {
      e(o, d);
      var r = l(o);
      function o(t, e) {
        var i;
        a(this, o);
        var n,
          s = f((n = t))
            ? n
            : n.scene && f(n.scene)
            ? n.scene
            : n.parent && n.parent.scene && f(n.parent.scene)
            ? n.parent.scene
            : void 0;
        return (
          s === t && (t = void 0),
          ((i = r.call(this, s, e)).scene = s),
          (i.gameObject = t) && t.setInteractive(m(e, 'inputConfig', void 0)),
          (i._enable = void 0),
          i.resetFromJSON(e),
          i.boot(),
          i
        );
      }
      return (
        t(o, [
          {
            key: 'resetFromJSON',
            value: function (t) {
              return (
                this.setEnable(m(t, 'enable', !0)),
                void 0 === this.gameObject
                  ? (this.bounds = m(t, 'bounds', void 0))
                  : (this.bounds = void 0),
                (this.tracerState = b),
                (this.pointer = void 0),
                (this.lastPointer = void 0),
                (this.movedState = !1),
                (this.isTouchingAnyObject = !1),
                this
              );
            },
          },
          {
            key: 'boot',
            value: function () {
              s(u(o.prototype), 'boot', this).call(this),
                this.gameObject
                  ? this.gameObject.on('pointerdown', this.onPointerDown, this)
                  : this.scene.input.on(
                      'pointerdown',
                      this.onPointerDown,
                      this,
                    ),
                this.scene.input.on('pointerup', this.onPointerUp, this),
                this.scene.input.on('pointermove', this.onPointerMove, this),
                this.scene.events.once('shutdown', this.destroy, this);
            },
          },
          {
            key: 'shutdown',
            value: function () {
              this.gameObject
                ? this.gameObject.off('pointerdown', this.onPointerDown, this)
                : this.scene &&
                  this.scene.input.off('pointerdown', this.onPointerDown, this),
                this.scene &&
                  (this.scene.input.off('pointerup', this.onPointerUp, this),
                  this.scene.input.off('pointermove', this.onPointerMove, this),
                  this.scene.events.off('destroy', this.destroy, this),
                  (this.scene = void 0)),
                (this.scene = void 0),
                (this.gameObject = void 0),
                (this.bounds = void 0),
                (this.pointer = void 0),
                (this.lastPointer = void 0),
                (this.movedState = !1),
                s(u(o.prototype), 'shutdown', this).call(this);
            },
          },
          {
            key: 'destroy',
            value: function () {
              this.shutdown();
            },
          },
          {
            key: 'setEnable',
            value: function (t) {
              return void 0 === t && (t = !0), (this.enable = t), this;
            },
          },
          {
            key: 'toggleEnable',
            value: function () {
              return this.setEnable(!this.enable), this;
            },
          },
          {
            key: 'onPointerDown',
            value: function (t, e) {
              this.enable &&
                void 0 === this.pointer &&
                ((this.bounds && !this.bounds.contains(t.x, t.y)) ||
                  this.pointer === t ||
                  ((this.pointer = t),
                  (this.lastPointer = t),
                  (this.movedState = !1),
                  (this.tracerState = E),
                  void 0 === this.gameObject &&
                    (this.isTouchingAnyObject = 0 < e.length),
                  this.onDragStart()));
            },
          },
          {
            key: 'onPointerUp',
            value: function (t) {
              this.enable &&
                ((this.bounds && !this.bounds.contains(t.x, t.y)) ||
                  this.pointer !== t ||
                  ((this.pointer = void 0),
                  (this.movedState = !1),
                  (this.tracerState = b),
                  this.onDragEnd()));
            },
          },
          {
            key: 'onPointerMove',
            value: function (t) {
              if (this.enable && t.isDown) {
                var e = !this.bounds || this.bounds.contains(t.x, t.y),
                  i = this.pointer === t;
                (!i && e) ||
                  (i && !e
                    ? this.onPointerUp(t)
                    : (this.movedState ||
                        (this.movedState = t.x !== t.downX || t.y !== t.downY),
                      this.movedState && this.onDrag()));
              }
            },
          },
          {
            key: 'dragCancel',
            value: function () {
              return (
                this.tracerState === E && this.onDragEnd(),
                (this.pointer = void 0),
                (this.tracerState = b),
                this
              );
            },
          },
          {
            key: 'onDragStart',
            value: function () {
              this.emit('dragstart', this);
            },
          },
          {
            key: 'onDragEnd',
            value: function () {
              this.emit('dragend', this);
            },
          },
          {
            key: 'onDrag',
            value: function () {
              this.emit('drag', this);
            },
          },
          { key: 'preUpdate', value: function () {} },
          { key: 'postUpdate', value: function () {} },
          {
            key: 'startTicking',
            value: function () {
              s(u(o.prototype), 'startTicking', this).call(this),
                this.scene.events.on('preupdate', this.preUpdate, this),
                this.scene.events.on('postupdate', this.postUpdate, this);
            },
          },
          {
            key: 'stopTicking',
            value: function () {
              s(u(o.prototype), 'stopTicking', this).call(this),
                this.scene &&
                  (this.scene.events.off('preupdate', this.preUpdate, this),
                  this.scene.events.off('postupdate', this.postUpdate, this));
            },
          },
          {
            key: 'setRecongizedStateObject',
            value: function (t) {
              return (this.recongizedState = t), this;
            },
          },
          {
            key: 'cancel',
            value: function () {
              return (this.state = w), this;
            },
          },
          {
            key: 'enable',
            get: function () {
              return this._enable;
            },
            set: function (t) {
              if (this._enable !== t)
                return t || this.dragCancel(), (this._enable = t), this;
            },
          },
          {
            key: 'state',
            get: function () {
              return this.recongizedState.state;
            },
            set: function (t) {
              this.recongizedState.state = t;
            },
          },
        ]),
        o
      );
    })(),
    b = 0,
    E = 1,
    w = 'IDLE',
    D = function (t, e, i) {
      if (t && 'number' != typeof t) {
        if (t.hasOwnProperty(e)) return t[e];
        if (-1 === e.indexOf('.')) return i;
        for (var n = e.split('.'), s = t, r = i, o = 0; o < n.length; o++) {
          if (!s.hasOwnProperty(n[o])) {
            r = i;
            break;
          }
          (r = s[n[o]]), (s = s[n[o]]);
        }
        return r;
      }
      return i;
    },
    S = (function () {
      function o(t) {
        a(this, o);
        var e = D(t, 'states', void 0);
        e && this.addStates(e);
        var i = D(t, 'extend', void 0);
        if (i)
          for (var n in i)
            (this.hasOwnProperty(n) && void 0 !== this[n]) || (this[n] = i[n]);
        var s = D(t, 'eventEmitter', void 0),
          r = D(t, 'EventEmitterClass', void 0);
        this.setEventEmitter(s, r),
          (this._stateLock = !1),
          this.resetFromJSON(t);
      }
      return (
        t(o, [
          {
            key: 'shutdown',
            value: function () {
              this.destroyEventEmitter();
            },
          },
          {
            key: 'destroy',
            value: function () {
              this.shutdown();
            },
          },
          {
            key: 'resetFromJSON',
            value: function (t) {
              this.setEnable(D(t, 'enable', !0)),
                this.start(D(t, 'start', void 0));
              var e = D(t, 'init', void 0);
              return e && e.call(this), this;
            },
          },
          {
            key: 'toJSON',
            value: function () {
              return {
                curState: this.state,
                prevState: this.prevState,
                enable: this.enable,
                start: this._start,
              };
            },
          },
          {
            key: 'setEnable',
            value: function (t) {
              return void 0 === t && (t = !0), (this.enable = t), this;
            },
          },
          {
            key: 'start',
            value: function (t) {
              return (
                (this._start = t),
                (this._prevState = void 0),
                (this._state = t),
                this
              );
            },
          },
          {
            key: 'goto',
            value: function (t) {
              return null != t && (this.state = t), this;
            },
          },
          {
            key: 'next',
            value: function () {
              var t,
                e = this['next_' + this.state];
              return (
                e && (t = 'string' == typeof e ? e : e.call(this)),
                this.goto(t),
                this
              );
            },
          },
          {
            key: 'addState',
            value: function (t, e) {
              var i = D(e, 'next', void 0);
              i && (this['next_' + t] = i);
              var n = D(e, 'exit', void 0);
              n && (this['exit_' + t] = n);
              var s = D(e, 'enter', void 0);
              return s && (this['enter_' + t] = s), this;
            },
          },
          {
            key: 'addStates',
            value: function (t) {
              for (var e in t) this.addState(e, t[e]);
              return this;
            },
          },
          {
            key: 'update',
            value: function (t, e, i) {
              void 0 === i && (i = 'update');
              var n = this[i + '_' + this.state];
              n && n.call(this, t, e);
            },
          },
          {
            key: 'preupdate',
            value: function (t, e) {
              this.update(t, e, 'preupdate');
            },
          },
          {
            key: 'postupdate',
            value: function (t, e) {
              this.update(t, e, 'postupdate');
            },
          },
          {
            key: 'state',
            set: function (t) {
              if (this.enable && !this._stateLock && this._state !== t) {
                if (
                  ((this._prevState = this._state),
                  (this._state = t),
                  (this._stateLock = !0),
                  this.emit('statechange', this),
                  null != this._prevState)
                ) {
                  var e = 'exit_' + this._prevState,
                    i = this[e];
                  i && i.call(this), this.emit(e, this);
                }
                if (((this._stateLock = !1), null != this._state)) {
                  var n = 'enter_' + this._state,
                    s = this[n];
                  s && s.call(this), this.emit(n, this);
                }
              }
            },
            get: function () {
              return this._state;
            },
          },
          {
            key: 'prevState',
            get: function () {
              return this._prevState;
            },
          },
        ]),
        o
      );
    })();
  Object.assign(S.prototype, o);
  function O(t) {
    return null == t || '' === t || 0 === t.length;
  }
  function P(t, e, i) {
    if ('object' === h(t)) {
      if (O(e)) {
        if (null == i) return;
        'object' === h(i) && (t = i);
      } else {
        'string' == typeof e && (e = e.split('.'));
        var n = e.pop();
        (function (t, e, i) {
          var n = t;
          if (!O(e)) {
            var s;
            'string' == typeof e && (e = e.split('.'));
            for (var r = 0, o = e.length; r < o; r++) {
              var a;
              if (null == n[(s = e[r])] || 'object' !== h(n[s]))
                (a = r !== o - 1 || void 0 === i ? {} : i), (n[s] = a);
              n = n[s];
            }
          }
          return n;
        })(t, e)[n] = i;
      }
      return t;
    }
  }
  function T(t) {
    return t instanceof G;
  }
  var _ = Phaser.Utils.Objects.GetValue,
    j = Phaser.Math.Distance.Between,
    R = (function () {
      e(o, k);
      var r = l(o);
      function o(t, e) {
        var i;
        a(this, o);
        var n = c((i = r.call(this, t, e))),
          s = {
            states: {
              IDLE: {
                enter: function () {
                  n.stop(),
                    (n.tapsCount = 0),
                    (n.x = 0),
                    (n.y = 0),
                    (n.worldX = 0),
                    (n.worldY = 0);
                },
                exit: function () {
                  var t = n.lastPointer;
                  (n.x = t.x),
                    (n.y = t.y),
                    (n.worldX = t.worldX),
                    (n.worldY = t.worldY);
                },
              },
              BEGIN: {
                enter: function () {
                  n.start(),
                    (n.tapsCount = 0),
                    n.emit('tappingstart', n, n.gameObject, n.lastPointer);
                },
              },
              RECOGNIZED: {
                enter: function () {
                  n.start(),
                    n.emit('tap', n, n.gameObject, n.lastPointer),
                    n.emit(
                      ''.concat(n.tapsCount, 'tap'),
                      n,
                      n.gameObject,
                      n.lastPointer,
                    );
                },
              },
            },
            init: function () {
              this.state = I;
            },
            eventEmitter: !1,
          };
        return i.setRecongizedStateObject(new S(s)), i;
      }
      return (
        t(o, [
          {
            key: 'resetFromJSON',
            value: function (t) {
              s(u(o.prototype), 'resetFromJSON', this).call(this, t),
                this.setMaxHoldTime(_(t, 'time', 250)),
                this.setTapInterval(_(t, 'tapInterval', 200)),
                this.setDragThreshold(_(t, 'threshold', 9)),
                this.setTapOffset(_(t, 'tapOffset', 10));
              var e = _(t, 'taps', void 0);
              return (
                void 0 !== e
                  ? this.setTaps(e)
                  : (this.setMaxTaps(_(t, 'maxTaps', void 0)),
                    this.setMinTaps(_(t, 'minTaps', void 0))),
                this
              );
            },
          },
          {
            key: 'onDragStart',
            value: function () {
              switch (this.state) {
                case I:
                  this.state = N;
                  break;
                case N:
                  var t = this.lastPointer;
                  j(t.upX, t.upY, t.x, t.y) > this.tapOffset &&
                    ((this.state = M), (this.state = N));
                  break;
                case M:
                  this.state = N;
              }
            },
          },
          {
            key: 'onDragEnd',
            value: function () {
              this.state === N &&
                (this.tapsCount++,
                this.emit('tapping', this, this.gameObject, this.lastPointer),
                void 0 !== this.maxTaps &&
                  this.tapsCount === this.maxTaps &&
                  (this.state = M));
            },
          },
          {
            key: 'onDrag',
            value: function () {
              this.state !== I &&
                this.pointer.getDistance() > this.dragThreshold &&
                (this.state = I);
            },
          },
          {
            key: 'preUpdate',
            value: function (t) {
              if (this.state === N) {
                var e = this.lastPointer;
                if (e.isDown)
                  t - e.downTime > this.holdTime && (this.state = I);
                else
                  t - e.upTime > this.tapInterval &&
                    (void 0 === this.minTaps || this.tapsCount >= this.minTaps
                      ? (this.state = M)
                      : (this.state = I));
              }
            },
          },
          {
            key: 'postUpdate',
            value: function () {
              this.state === M && (this.state = I);
            },
          },
          {
            key: 'setMaxHoldTime',
            value: function (t) {
              return (this.holdTime = t), this;
            },
          },
          {
            key: 'setTapInterval',
            value: function (t) {
              return (this.tapInterval = t), this;
            },
          },
          {
            key: 'setDragThreshold',
            value: function (t) {
              return (this.dragThreshold = t), this;
            },
          },
          {
            key: 'setTapOffset',
            value: function (t) {
              return (this.tapOffset = t), this;
            },
          },
          {
            key: 'setMaxTaps',
            value: function (t) {
              return (this.maxTaps = t), this;
            },
          },
          {
            key: 'setMinTaps',
            value: function (t) {
              return (this.minTaps = t), this;
            },
          },
          {
            key: 'setTaps',
            value: function (t, e) {
              return (
                void 0 === e && (e = t), this.setMinTaps(t).setMaxTaps(e), this
              );
            },
          },
          {
            key: 'isTapped',
            get: function () {
              return this.state === M;
            },
          },
        ]),
        o
      );
    })(),
    I = 'IDLE',
    N = 'BEGIN',
    M = 'RECOGNIZED',
    G = Phaser.GameObjects.GameObject;
  r.register('tap', function (t, e) {
    return T(t) || ((e = t), (t = this.scene)), new R(t, e);
  }),
    P(window, 'RexPlugins.Gestures.Tap', R);
  var C = Phaser.Utils.Objects.GetValue,
    X = (function () {
      e(o, k);
      var r = l(o);
      function o(t, e) {
        var i;
        a(this, o);
        var n = c((i = r.call(this, t, e))),
          s = {
            states: {
              IDLE: {
                enter: function () {
                  (n.x = 0), (n.y = 0), (n.worldX = 0), (n.worldY = 0);
                },
                exit: function () {
                  var t = n.lastPointer;
                  (n.x = t.x),
                    (n.y = t.y),
                    (n.worldX = t.worldX),
                    (n.worldY = t.worldY);
                },
              },
              BEGIN: {
                enter: function () {
                  n.start();
                },
                exit: function () {
                  n.stop();
                },
              },
              RECOGNIZED: {
                enter: function () {
                  n.emit('pressstart', n, n.gameObject, n.lastPointer);
                },
                exit: function () {
                  n.emit('pressend', n, n.gameObject, n.lastPointer);
                },
              },
            },
            init: function () {
              this.state = Y;
            },
            eventEmitter: !1,
          };
        return i.setRecongizedStateObject(new S(s)), i;
      }
      return (
        t(o, [
          {
            key: 'resetFromJSON',
            value: function (t) {
              return (
                s(u(o.prototype), 'resetFromJSON', this).call(this, t),
                this.setDragThreshold(C(t, 'threshold', 9)),
                this.setMinHoldTime(C(t, 'time', 251)),
                this
              );
            },
          },
          {
            key: 'onDragStart',
            value: function () {
              this.state = 0 === this.holdTime ? B : U;
            },
          },
          {
            key: 'onDragEnd',
            value: function () {
              this.state = Y;
            },
          },
          {
            key: 'onDrag',
            value: function () {
              this.state !== Y &&
                this.pointer.getDistance() > this.dragThreshold &&
                (this.state = Y);
            },
          },
          {
            key: 'preUpdate',
            value: function (t) {
              this.state === U &&
                t - this.pointer.downTime >= this.holdTime &&
                (this.state = B);
            },
          },
          {
            key: 'setDragThreshold',
            value: function (t) {
              return (this.dragThreshold = t), this;
            },
          },
          {
            key: 'setMinHoldTime',
            value: function (t) {
              return (this.holdTime = t), this;
            },
          },
          {
            key: 'isPressed',
            get: function () {
              return this.state === B;
            },
          },
        ]),
        o
      );
    })(),
    Y = 'IDLE',
    U = 'BEGIN',
    B = 'RECOGNIZED';
  r.register('press', function (t, e) {
    return T(t) || ((e = t), (t = this.scene)), new X(t, e);
  }),
    P(window, 'RexPlugins.Gestures.Press', X);
  var L = Phaser.Utils.Objects.GetValue,
    V = (function () {
      e(o, k);
      var r = l(o);
      function o(t, e) {
        var i;
        a(this, o);
        var n = c((i = r.call(this, t, e))),
          s = {
            states: {
              IDLE: {},
              BEGIN: {
                enter: function () {
                  var t = n.pointer;
                  (n.startX = t.x),
                    (n.startY = t.y),
                    (n.startWorldX = t.worldX),
                    (n.startWorldY = t.worldY);
                },
              },
              RECOGNIZED: {
                enter: function () {
                  n.emit('panstart', n, n.gameObject, n.lastPointer);
                },
                exit: function () {
                  var t = n.lastPointer;
                  (n.endX = t.x),
                    (n.endY = t.y),
                    (n.endWorldX = t.worldX),
                    (n.endWorldY = t.worldY),
                    n.emit('panend', n, n.gameObject, n.lastPointer);
                },
              },
            },
            init: function () {
              this.state = A;
            },
            eventEmitter: !1,
          };
        return i.setRecongizedStateObject(new S(s)), i;
      }
      return (
        t(o, [
          {
            key: 'resetFromJSON',
            value: function (t) {
              return (
                s(u(o.prototype), 'resetFromJSON', this).call(this, t),
                this.setDragThreshold(L(t, 'threshold', 10)),
                this
              );
            },
          },
          {
            key: 'onDragStart',
            value: function () {
              this.state = 0 === this.dragThreshold ? J : F;
            },
          },
          {
            key: 'onDragEnd',
            value: function () {
              this.state = A;
            },
          },
          {
            key: 'onDrag',
            value: function () {
              switch (this.state) {
                case F:
                  this.pointer.getDistance() >= this.dragThreshold &&
                    (this.state = J);
                  break;
                case J:
                  var t = this.pointer.position,
                    e = this.pointer.prevPosition;
                  (this.dx = t.x - e.x), (this.dy = t.y - e.y);
                  var i = this.pointer;
                  (this.x = i.x),
                    (this.y = i.y),
                    (this.worldX = i.worldX),
                    (this.worldY = i.worldY),
                    this.emit('pan', this, this.gameObject, this.lastPointer);
              }
            },
          },
          {
            key: 'setDragThreshold',
            value: function (t) {
              return (this.dragThreshold = t), this;
            },
          },
          {
            key: 'isPan',
            get: function () {
              return this.state === J;
            },
          },
        ]),
        o
      );
    })(),
    A = 'IDLE',
    F = 'BEGIN',
    J = 'RECOGNIZED';
  r.register('pan', function (t, e) {
    return T(t) || ((e = t), (t = this.scene)), new V(t, e);
  }),
    P(window, 'RexPlugins.Gestures.Pan', V);
  var z = Phaser.Math.Distance.Between,
    Z = Phaser.Math.Angle.Between,
    W = {
      getDt: function () {
        return this.scene.sys.game.loop.delta;
      },
      getVelocity: function () {
        var t = this.pointer.position,
          e = this.pointer.prevPosition;
        return z(e.x, e.y, t.x, t.y) / (0.001 * this.getDt());
      },
      getVelocityX: function () {
        var t = this.pointer.position,
          e = this.pointer.prevPosition;
        return Math.abs(t.x - e.x) / (0.001 * this.getDt());
      },
      getVelocityY: function () {
        var t = this.pointer.position,
          e = this.pointer.prevPosition;
        return Math.abs(t.y - e.y) / (0.001 * this.getDt());
      },
      getVelocityAngle: function () {
        var t = this.pointer.position,
          e = this.pointer.prevPosition;
        return Z(e.x, e.y, t.x, t.y);
      },
    },
    H = { 'up&down': 0, 'left&right': 1, '4dir': 2, '8dir': 3 },
    q = {},
    K = Phaser.Utils.Objects.GetValue,
    Q = Phaser.Math.RadToDeg,
    $ = (function () {
      e(o, k);
      var r = l(o);
      function o(t, e) {
        var i;
        a(this, o);
        var n = c((i = r.call(this, t, e))),
          s = {
            states: {
              IDLE: {
                enter: function () {
                  (n.x = 0), (n.y = 0), (n.worldX = 0), (n.worldY = 0);
                },
                exit: function () {
                  var t = n.lastPointer;
                  (n.x = t.x),
                    (n.y = t.y),
                    (n.worldX = t.worldX),
                    (n.worldY = t.worldY);
                },
              },
              BEGIN: {
                enter: function () {
                  n.validDrag = !1;
                },
              },
              RECOGNIZED: {
                enter: function () {
                  n.start(),
                    n.updateDirectionStates(),
                    n.emit('swipe', n, n.gameObject, n.lastPointer);
                },
                exit: function () {
                  n.stop(), n.clearDirectionStates();
                },
              },
            },
            init: function () {
              this.state = tt;
            },
            eventEmitter: !1,
          };
        return (
          i.setRecongizedStateObject(new S(s)), i.clearDirectionStates(), i
        );
      }
      return (
        t(o, [
          {
            key: 'resetFromJSON',
            value: function (t) {
              return (
                s(u(o.prototype), 'resetFromJSON', this).call(this, t),
                this.setDragThreshold(K(t, 'threshold', 10)),
                this.setMinDragVelocity(K(t, 'velocityThreshold', 1e3)),
                this.setDirectionMode(K(t, 'dir', '8dir')),
                this
              );
            },
          },
          {
            key: 'onDragStart',
            value: function () {
              this.state = et;
            },
          },
          {
            key: 'onDragEnd',
            value: function () {
              this.state = tt;
            },
          },
          {
            key: 'onDrag',
            value: function () {
              this.state === et &&
                (this.vaildDrag ||
                  (this.vaildDrag =
                    0 === this.dragThreshold ||
                    this.pointer.getDistance() >= this.dragThreshold),
                this.vaildDrag &&
                  this.dragVelocity > this.minDragVelocity &&
                  (this.state = it));
            },
          },
          {
            key: 'postUpdate',
            value: function () {
              this.state === it && (this.state = tt);
            },
          },
          {
            key: 'setDragThreshold',
            value: function (t) {
              return (this.dragThreshold = t), this;
            },
          },
          {
            key: 'setMinDragVelocity',
            value: function (t) {
              return (this.minDragVelocity = t), this;
            },
          },
          {
            key: 'setDirectionMode',
            value: function (t) {
              return (
                'string' == typeof t && (t = H[t]), (this.dirMode = t), this
              );
            },
          },
          {
            key: 'updateDirectionStates',
            value: function () {
              return (
                (function (t, e, i) {
                  switch (
                    (void 0 === i ? (i = {}) : !0 === i && (i = q),
                    (i.left = !1),
                    (i.right = !1),
                    (i.up = !1),
                    (i.down = !1),
                    (t = (t + 360) % 360),
                    e)
                  ) {
                    case 0:
                      t < 180 ? (i.down = !0) : (i.up = !0);
                      break;
                    case 1:
                      90 < t && t <= 270 ? (i.left = !0) : (i.right = !0);
                      break;
                    case 2:
                      45 < t && t <= 135
                        ? (i.down = !0)
                        : 135 < t && t <= 225
                        ? (i.left = !0)
                        : 225 < t && t <= 315
                        ? (i.up = !0)
                        : (i.right = !0);
                      break;
                    case 3:
                      22.5 < t && t <= 67.5
                        ? ((i.down = !0), (i.right = !0))
                        : 67.5 < t && t <= 112.5
                        ? (i.down = !0)
                        : 112.5 < t && t <= 157.5
                        ? ((i.down = !0), (i.left = !0))
                        : 157.5 < t && t <= 202.5
                        ? (i.left = !0)
                        : 202.5 < t && t <= 247.5
                        ? ((i.left = !0), (i.up = !0))
                        : 247.5 < t && t <= 292.5
                        ? (i.up = !0)
                        : (292.5 < t && t <= 337.5 && (i.up = !0),
                          (i.right = !0));
                  }
                })(Q(this.getVelocityAngle()), this.dirMode, this),
                this
              );
            },
          },
          {
            key: 'clearDirectionStates',
            value: function () {
              return (
                (this.left = !1),
                (this.right = !1),
                (this.up = !1),
                (this.down = !1),
                this
              );
            },
          },
          {
            key: 'isSwiped',
            get: function () {
              return this.state === it;
            },
          },
          {
            key: 'dragVelocity',
            get: function () {
              var t;
              switch (this.dirMode) {
                case 0:
                  t = this.getVelocityY();
                  break;
                case 1:
                  t = this.getVelocityX();
                  break;
                default:
                  t = this.getVelocity();
              }
              return t;
            },
          },
        ]),
        o
      );
    })();
  Object.assign($.prototype, W);
  var tt = 'IDLE',
    et = 'BEGIN',
    it = 'RECOGNIZED';
  r.register('swipe', function (t, e) {
    return T(t) || ((e = t), (t = this.scene)), new $(t, e);
  }),
    P(window, 'RexPlugins.Gestures.Swipe', $);
  function nt(t) {
    if (Array.isArray(t)) t.length = 0;
    else for (var e in t) delete t[e];
  }
  var st = Phaser.Utils.Objects.GetValue,
    rt = Phaser.Utils.Array.SpliceOne,
    ot = Phaser.Math.Distance.Between,
    at = Phaser.Math.Angle.Between,
    ht = (function () {
      function n(t, e) {
        a(this, n);
        var i = t.input.manager.pointersTotal - 1;
        i < 2 && t.input.addPointer(2 - i),
          (this.scene = t),
          this.setEventEmitter(st(e, 'eventEmitter', void 0)),
          (this._enable = void 0),
          (this.pointers = []),
          (this.movedState = {}),
          this.resetFromJSON(e),
          this.boot();
      }
      return (
        t(n, [
          {
            key: 'resetFromJSON',
            value: function (t) {
              return (
                this.setEnable(st(t, 'enable', !0)),
                (this.bounds = st(t, 'bounds', void 0)),
                (this.tracerState = ct),
                (this.pointers.length = 0),
                nt(this.movedState),
                this
              );
            },
          },
          {
            key: 'boot',
            value: function () {
              this.scene.input.on('pointerdown', this.onPointerDown, this),
                this.scene.input.on('pointerup', this.onPointerUp, this),
                this.scene.input.on('pointermove', this.onPointerMove, this),
                this.scene.events.once('shutdown', this.destroy, this);
            },
          },
          {
            key: 'shutdown',
            value: function () {
              this.destroyEventEmitter(),
                (this.pointers.length = 0),
                nt(this.movedState),
                this.scene &&
                  (this.scene.input.off(
                    'pointerdown',
                    this.onPointerDown,
                    this,
                  ),
                  this.scene.input.off('pointerup', this.onPointerUp, this),
                  this.scene.input.off('pointermove', this.onPointerMove, this),
                  this.scene.events.off('destroy', this.destroy, this),
                  (this.scene = void 0)),
                (this.scene = void 0);
            },
          },
          {
            key: 'destroy',
            value: function () {
              this.shutdown();
            },
          },
          {
            key: 'setEnable',
            value: function (t) {
              return void 0 === t && (t = !0), (this.enable = t), this;
            },
          },
          {
            key: 'toggleEnable',
            value: function () {
              return this.setEnable(!this.enable), this;
            },
          },
          {
            key: 'onPointerDown',
            value: function (t) {
              if (
                this.enable &&
                2 !== this.pointers.length &&
                (!this.bounds || this.bounds.contains(t.x, t.y)) &&
                -1 === this.pointers.indexOf(t)
              )
                switch (
                  ((this.movedState[t.id] = !1),
                  this.pointers.push(t),
                  this.tracerState)
                ) {
                  case ct:
                    (this.tracerState = lt), this.onDrag1Start();
                    break;
                  case lt:
                    (this.tracerState = vt), this.onDrag2Start();
                }
            },
          },
          {
            key: 'onPointerUp',
            value: function (t) {
              if (
                this.enable &&
                (!this.bounds || this.bounds.contains(t.x, t.y))
              ) {
                var e = this.pointers.indexOf(t);
                if (-1 !== e)
                  switch (
                    (delete this.movedState[t.id],
                    rt(this.pointers, e),
                    this.tracerState)
                  ) {
                    case lt:
                      (this.tracerState = ct), this.onDrag1End();
                      break;
                    case vt:
                      (this.tracerState = lt),
                        this.onDrag2End(),
                        this.onDrag1Start();
                  }
              }
            },
          },
          {
            key: 'onPointerMove',
            value: function (t) {
              if (this.enable && t.isDown) {
                var e = !this.bounds || this.bounds.contains(t.x, t.y),
                  i = -1 !== this.pointers.indexOf(t);
                if (i || !e)
                  if (i && !e) this.onPointerUp(t);
                  else if (
                    (this.movedState[t.id] ||
                      (this.movedState[t.id] =
                        t.x !== t.downX || t.y !== t.downY),
                    this.movedState[t.id])
                  )
                    switch (this.tracerState) {
                      case lt:
                        this.onDrag1();
                        break;
                      case vt:
                        this.onDrag2();
                    }
              }
            },
          },
          {
            key: 'dragCancel',
            value: function () {
              return (
                this.tracerState === vt && this.onDrag2End(),
                (this.pointers.length = 0),
                nt(this.movedState),
                (this.tracerState = ct),
                this
              );
            },
          },
          {
            key: 'onDrag1Start',
            value: function () {
              this.emit('drag1start', this);
            },
          },
          {
            key: 'onDrag1End',
            value: function () {
              this.emit('drag1end', this);
            },
          },
          {
            key: 'onDrag1',
            value: function () {
              this.emit('drag1', this);
            },
          },
          {
            key: 'onDrag2Start',
            value: function () {
              this.emit('drag2start', this);
            },
          },
          {
            key: 'onDrag2End',
            value: function () {
              this.emit('drag2end', this);
            },
          },
          {
            key: 'onDrag2',
            value: function () {
              this.emit('drag2', this);
            },
          },
          {
            key: 'setRecongizedStateObject',
            value: function (t) {
              return (this.recongizedState = t), this;
            },
          },
          {
            key: 'cancel',
            value: function () {
              return (this.state = dt), this;
            },
          },
          {
            key: 'enable',
            get: function () {
              return this._enable;
            },
            set: function (t) {
              if (this._enable !== t)
                return t || this.dragCancel(), (this._enable = t), this;
            },
          },
          {
            key: 'distanceBetween',
            get: function () {
              if (this.tracerState !== vt) return 0;
              var t = this.pointers[0],
                e = this.pointers[1];
              return ot(t.x, t.y, e.x, e.y);
            },
          },
          {
            key: 'angleBetween',
            get: function () {
              if (this.tracerState !== vt) return 0;
              var t = this.pointers[0],
                e = this.pointers[1];
              return at(t.x, t.y, e.x, e.y);
            },
          },
          {
            key: 'drag1Vector',
            get: function () {
              var t = this.pointers[0];
              if (t && this.movedState[t.id]) {
                var e = t.position,
                  i = t.prevPosition;
                (ut.x = e.x - i.x), (ut.y = e.y - i.y);
              } else (ut.x = 0), (ut.y = 0);
              return ut;
            },
          },
          {
            key: 'centerX',
            get: function () {
              if (this.tracerState !== vt) return 0;
              var t = this.pointers[0].position,
                e = this.pointers[1].position;
              return (t.x + e.x) / 2;
            },
          },
          {
            key: 'centerY',
            get: function () {
              if (this.tracerState !== vt) return 0;
              var t = this.pointers[0].position,
                e = this.pointers[1].position;
              return (t.y + e.y) / 2;
            },
          },
          {
            key: 'prevCenterX',
            get: function () {
              if (this.tracerState !== vt) return 0;
              var t = this.movedState[this.pointers[0].id]
                  ? this.pointers[0].prevPosition
                  : this.pointers[0].position,
                e = this.movedState[this.pointers[1].id]
                  ? this.pointers[1].prevPosition
                  : this.pointers[1].position;
              return (t.x + e.x) / 2;
            },
          },
          {
            key: 'prevCenterY',
            get: function () {
              if (this.tracerState !== vt) return 0;
              var t = this.movedState[this.pointers[0].id]
                  ? this.pointers[0].prevPosition
                  : this.pointers[0].position,
                e = this.movedState[this.pointers[1].id]
                  ? this.pointers[1].prevPosition
                  : this.pointers[1].position;
              return (t.y + e.y) / 2;
            },
          },
          {
            key: 'movementCenterX',
            get: function () {
              return this.centerX - this.prevCenterX;
            },
          },
          {
            key: 'movementCenterY',
            get: function () {
              return this.centerY - this.prevCenterY;
            },
          },
          {
            key: 'state',
            get: function () {
              return this.recongizedState.state;
            },
            set: function (t) {
              this.recongizedState.state = t;
            },
          },
        ]),
        n
      );
    })();
  Object.assign(ht.prototype, o);
  var ut = {},
    ct = 0,
    lt = 1,
    vt = 2,
    dt = 'IDLE',
    ft = Phaser.Utils.Objects.GetValue,
    pt = (function () {
      e(o, ht);
      var r = l(o);
      function o(t, e) {
        var i;
        a(this, o);
        var n = c((i = r.call(this, t, e))),
          s = {
            states: {
              IDLE: {
                enter: function () {
                  (n.prevDistance = void 0), (n.scaleFactor = 1);
                },
              },
              BEGIN: {},
              RECOGNIZED: {
                enter: function () {
                  n.emit('pinchstart', n);
                },
                exit: function () {
                  n.emit('pinchend', n);
                },
              },
            },
            init: function () {
              this.state = gt;
            },
            eventEmitter: !1,
          };
        return i.setRecongizedStateObject(new S(s)), i;
      }
      return (
        t(o, [
          {
            key: 'resetFromJSON',
            value: function (t) {
              return (
                s(u(o.prototype), 'resetFromJSON', this).call(this, t),
                this.setDragThreshold(ft(t, 'threshold', 0)),
                this
              );
            },
          },
          {
            key: 'onDrag2Start',
            value: function () {
              (this.scaleFactor = 1),
                (this.prevDistance = this.distanceBetween),
                (this.state = 0 === this.dragThreshold ? mt : yt);
            },
          },
          {
            key: 'onDrag2End',
            value: function () {
              this.state = gt;
            },
          },
          {
            key: 'onDrag2',
            value: function () {
              switch (this.state) {
                case yt:
                  if (
                    this.pointers[0].getDistance() >= this.dragThreshold &&
                    this.pointers[1].getDistance() >= this.dragThreshold
                  ) {
                    var t = this.distanceBetween;
                    (this.scaleFactor = t / this.prevDistance),
                      (this.prevDistance = t),
                      (this.state = mt);
                  }
                  break;
                case mt:
                  t = this.distanceBetween;
                  (this.scaleFactor = t / this.prevDistance),
                    this.emit('pinch', this),
                    (this.prevDistance = t);
              }
            },
          },
          {
            key: 'setDragThreshold',
            value: function (t) {
              return (this.dragThreshold = t), this;
            },
          },
          {
            key: 'isPinch',
            get: function () {
              return this.state === mt;
            },
          },
        ]),
        o
      );
    })(),
    gt = 'IDLE',
    yt = 'BEGIN',
    mt = 'RECOGNIZED';
  r.register('pinch', function (t) {
    return new pt(this.scene, t);
  }),
    P(window, 'RexPlugins.Gestures.Pinch', pt);
  function kt(t, e, i, n) {
    return bt(t, e, i, n), (t.rotation += n), t;
  }
  var bt = Phaser.Math.RotateAround,
    Et = {},
    wt = Phaser.Utils.Objects.GetValue,
    Dt = Phaser.Math.Angle.WrapDegrees,
    St = Phaser.Math.Angle.ShortestBetween,
    Ot = Phaser.Math.RadToDeg,
    Pt = Phaser.Math.DegToRad,
    xt = (function () {
      e(o, ht);
      var r = l(o);
      function o(t, e) {
        var i;
        a(this, o);
        var n = c((i = r.call(this, t, e))),
          s = {
            states: {
              IDLE: {
                enter: function () {
                  (n.prevAngle = void 0), (n.angle = 0);
                },
              },
              BEGIN: {},
              RECOGNIZED: {
                enter: function () {
                  n.emit('rotatestart', n);
                },
                exit: function () {
                  n.emit('rotateend', n);
                },
              },
            },
            init: function () {
              this.state = _t;
            },
            eventEmitter: !1,
          };
        return i.setRecongizedStateObject(new S(s)), i;
      }
      return (
        t(o, [
          {
            key: 'resetFromJSON',
            value: function (t) {
              return (
                s(u(o.prototype), 'resetFromJSON', this).call(this, t),
                this.setDragThreshold(wt(t, 'threshold', 0)),
                this
              );
            },
          },
          {
            key: 'onDrag2Start',
            value: function () {
              (this.prevAngle = Dt(Ot(this.angleBetween))),
                (this.state = 0 === this.rotationThreshold ? Rt : jt);
            },
          },
          {
            key: 'onDrag2End',
            value: function () {
              this.state = _t;
            },
          },
          {
            key: 'onDrag2',
            value: function () {
              switch (this.state) {
                case jt:
                  if (
                    this.pointers[0].getDistance() >= this.dragThreshold &&
                    this.pointers[1].getDistance() >= this.dragThreshold
                  ) {
                    var t = Dt(Ot(this.angleBetween));
                    (this.angle = St(this.prevAngle, t)),
                      (this.prevAngle = t),
                      (this.state = Rt);
                  }
                  break;
                case Rt:
                  t = Dt(Ot(this.angleBetween));
                  (this.angle = St(this.prevAngle, t)),
                    (this.prevAngle = t),
                    this.emit('rotate', this);
              }
            },
          },
          {
            key: 'setDragThreshold',
            value: function (t) {
              return (this.dragThreshold = t), this;
            },
          },
          {
            key: 'isRotation',
            get: function () {
              return this.state === Rt;
            },
          },
          {
            key: 'rotation',
            get: function () {
              return Pt(this.angle);
            },
          },
        ]),
        o
      );
    })(),
    Tt = {
      spinObject: function (t, e) {
        if (!this.isRotation) return this;
        void 0 === e && (e = this.pointers[0].camera);
        var i = this.movementCenterX,
          n = this.movementCenterY;
        e.getWorldPoint(this.centerX, this.centerY, Et);
        var s = Et.x,
          r = Et.y,
          o = this.rotation;
        if (Array.isArray(t))
          for (var a = t, h = 0, u = a.length; h < u; h++)
            ((t = a[h]).x += i), (t.y += n), kt(t, s, r, o);
        else (t.x += i), (t.y += n), kt(t, x, y, o);
        return this;
      },
    };
  Object.assign(xt.prototype, Tt);
  var _t = 'IDLE',
    jt = 'BEGIN',
    Rt = 'RECOGNIZED';
  return (
    r.register('rotate', function (t) {
      return new xt(this.scene, t);
    }),
    P(window, 'RexPlugins.Gestures.Rotate', xt),
    (function () {
      e(s, Phaser.Plugins.ScenePlugin);
      var n = l(s);
      function s(t, e) {
        var i;
        return a(this, s), ((i = n.call(this, t, e)).add = new r(t)), i;
      }
      return s;
    })()
  );
});
