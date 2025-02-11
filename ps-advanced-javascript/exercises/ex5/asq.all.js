/*! asynquence
    v0.3.4-g (c) Kyle Simpson
    MIT License: http://getify.mit-license.org
*/
!(function(n, e, t) {
  "undefined" != typeof module && module.exports
    ? (module.exports = t())
    : "function" == typeof define && define.amd ? define(t) : (e[n] = t(n, e));
})("ASQ", this, function(n, e) {
  "use strict";
  function t(n) {
    return "undefined" != typeof setImmediate
      ? setImmediate(n)
      : setTimeout(n, 0);
  }
  function u() {
    function n() {
      clearTimeout(I),
        (I = null),
        (w.length = 0),
        (C.length = 0),
        (P.length = 0),
        (z.length = 0);
    }
    function e() {
      return Q ? l() : (I || (I = t(l)), void 0);
    }
    function l() {
      var t, u;
      if (((I = null), delete B.unpause, Q)) n();
      else if (M)
        for (; C.length; ) {
          t = C.shift();
          try {
            t.apply(y, z);
          } catch (r) {
            a(r) ? (z = z.concat(r)) : (z.push(r), r.stack && z.push(r.stack)),
              0 === C.length && console.error.apply(console, z);
          }
        }
      else if (W && w.length > 0) {
        (W = !1),
          (t = w.shift()),
          (u = P.slice()),
          (P.length = 0),
          u.unshift(g());
        try {
          t.apply(y, u);
        } catch (r) {
          a(r) ? (z = z.concat(r)) : z.push(r), (M = !0), e();
        }
      }
    }
    function g() {
      function n() {
        M ||
          Q ||
          W ||
          ((W = !0), P.push.apply(P, arguments), (z.length = 0), e());
      }
      return (
        (n.fail = function() {
          M ||
            Q ||
            W ||
            ((M = !0), (P.length = 0), z.push.apply(z, arguments), e());
        }),
        (n.abort = function() {
          M || Q || ((W = !1), (Q = !0), (P.length = 0), (z.length = 0), e());
        }),
        (n.errfcb = function(e) {
          e ? n.fail(e) : n.apply(y, m.call(arguments, 1));
        }),
        n
      );
    }
    function h(n, e, u) {
      function r() {
        clearTimeout(h), (h = _ = q = g = null);
      }
      function l() {
        return v ? i() : (h || (h = t(i)), void 0);
      }
      function i() {
        if (!(M || Q || b)) {
          var e = [];
          (h = null),
            d
              ? (n.fail.apply(y, g), r())
              : v
                ? (n.abort(), r())
                : c() &&
                  ((b = !0),
                  _.forEach(function(n, t) {
                    e.push(q["s" + t]);
                  }),
                  n.apply(y, e),
                  r());
        }
      }
      function c() {
        if (!(M || Q || d || v || b || 0 === _.length)) {
          var n = !0;
          return (
            _.some(function(e) {
              return null === e ? ((n = !1), !0) : void 0;
            }),
            n
          );
        }
      }
      function o() {
        function n() {
          if (!(M || Q || d || v || b || _[e])) {
            var n = s.messages.apply(y, arguments);
            (q["s" + e] = n.length > 1 ? n : n[0]), (_[e] = !0), l();
          }
        }
        var e = _.length;
        return (
          (n.fail = function() {
            M ||
              Q ||
              d ||
              v ||
              b ||
              _[e] ||
              ((d = !0), (g = m.call(arguments)), l());
          }),
          (n.abort = function() {
            M || Q || d || v || b || ((v = !0), i());
          }),
          (n.errfcb = function(e) {
            e ? n.fail(e) : n.apply(y, m.call(arguments, 1));
          }),
          (_[e] = null),
          n
        );
      }
      var f,
        p,
        g,
        h,
        d = !1,
        v = !1,
        b = !1,
        _ = [],
        q = {};
      e.some(function(n) {
        if (d || v) return !0;
        (f = u.slice()), f.unshift(o());
        try {
          n.apply(y, f);
        } catch (e) {
          return (p = e), (d = !0), !0;
        }
      }),
        p && (a(p) ? n.fail.apply(y, p) : n.fail(p));
    }
    function d() {
      return M || Q || 0 === arguments.length
        ? B
        : (w.push.apply(w, o(arguments, c)), e(), B);
    }
    function v() {
      return Q || 0 === arguments.length
        ? B
        : (C.push.apply(C, arguments), e(), B);
    }
    function b() {
      if (M || Q || 0 === arguments.length) return B;
      var n = m.call(arguments);
      return (
        d(function(e) {
          var t = m.call(arguments, 1);
          h(e, n, t);
        }),
        B
      );
    }
    function _() {
      return Q || 0 === arguments.length
        ? B
        : (m.call(arguments).forEach(function(n) {
            d(function(e) {
              n.apply(y, m.call(arguments, 1)), e();
            }).or(n.fail);
          }),
          B);
    }
    function q() {
      return M || Q || 0 === arguments.length
        ? B
        : (m.call(arguments).forEach(function(n) {
            var e;
            a(n) &&
              "next" in n &&
              (n
                .then(function() {
                  e.apply(y, arguments);
                })
                .or(function() {
                  e.fail.apply(y, arguments);
                }),
              (n = u(function(n) {
                e = n;
              })),
              (e = function() {
                n = u.apply(y, arguments);
              }),
              (e.fail = function() {
                var e = m.call(arguments);
                n = u(function(n) {
                  n.fail.apply(y, e);
                });
              })),
              d(function(e) {
                a(n) || (n = n.apply(y, m.call(arguments, 1))), n.pipe(e);
              });
          }),
          B);
    }
    function A() {
      return M || Q || 0 === arguments.length
        ? B
        : (m.call(o(arguments, i)).forEach(function(n) {
            d(function(e) {
              var t = n.apply(y, m.call(arguments, 1));
              a(t) || (t = s.messages(t)), e.apply(y, t);
            });
          }),
          B);
    }
    function k() {
      function n(n) {
        return function() {
          n.apply(
            y,
            s.isMessageWrapper(arguments[0]) ? arguments[0] : arguments
          );
        };
      }
      return M || Q || 0 === arguments.length
        ? B
        : (m.call(arguments).forEach(function(e) {
            d(function(t) {
              "function" != typeof e ||
                "then" in e ||
                (e = e.apply(y, m.call(arguments, 1))),
                e.then(n(t), n(t.fail));
            });
          }),
          B);
    }
    function E() {
      var n;
      return (
        A(function() {
          return (
            n ? n.apply(y, arguments) : (n = u.apply(y, arguments)),
            s.messages.apply(y, arguments)
          );
        }),
        v(function() {
          if (n) n.fail.apply(y, arguments);
          else {
            var e = m.call(arguments);
            n = u().then(function(n) {
              n.fail.apply(y, e);
            });
          }
        }),
        u().then(function(e) {
          n ? n.pipe(e) : (n = e);
        })
      );
    }
    function x() {
      return M ? B : ((Q = !0), l(), B);
    }
    function j() {
      var n;
      return (
        (f = { then_queue: w.slice(0), or_queue: C.slice(0) }),
        (n = u()),
        (f = null),
        n
      );
    }
    function O() {
      P.push.apply(P, arguments), I === !0 && (I = null), e();
    }
    function S(n, e) {
      var t = arguments.length > 1;
      switch (n) {
        case "seq_error":
          if (!t) return M;
          M = e;
          break;
        case "seq_aborted":
          if (!t) return Q;
          Q = e;
          break;
        case "then_ready":
          if (!t) return W;
          W = e;
          break;
        case "then_queue":
          return w;
        case "or_queue":
          return C;
        case "sequence_messages":
          return P;
        case "sequence_errors":
          return z;
      }
    }
    function T() {
      Object.keys(p).forEach(function(n) {
        B[n] = p[n](B, S);
      });
    }
    var I,
      M = !1,
      Q = !1,
      W = !0,
      w = [],
      C = [],
      P = [],
      z = [],
      B = r({
        then: d,
        or: v,
        gate: b,
        pipe: _,
        seq: q,
        val: A,
        promise: k,
        fork: E,
        abort: x,
        duplicate: j
      });
    return (
      T(),
      f &&
        ((w = f.then_queue.slice(0)),
        (C = f.or_queue.slice(0)),
        (B.unpause = O),
        (I = !0)),
      B.then.apply(y, o(arguments, c)),
      B
    );
  }
  function r(n) {
    return Object.defineProperty(n, h, { enumerable: !1, value: !0 }), n;
  }
  function a(n) {
    return null != n && "object" == typeof n && n[h];
  }
  function l(n, e) {
    return m.call(e).slice(1, n + 1);
  }
  function i(n) {
    return s.messages.apply(y, l(n, arguments));
  }
  function c(n) {
    arguments[n + 1].apply(y, l(n, arguments));
  }
  function o(n, e) {
    var t, u;
    for (n = m.call(n), t = 0; t < n.length; t++)
      if (Array.isArray(n[t]) && a(n[t]))
        n[t] = e.bind.apply(e, [null, n[t].length].concat(n[t]));
      else if ("function" != typeof n[t]) {
        for (
          u = t + 1;
          u < n.length && ("function" != typeof n[u] && !a(n[u]));
          u++
        );
        n.splice(
          t,
          u - t,
          e.bind.apply(e, [null, u - t].concat(n.slice(t, u)))
        );
      }
    return n;
  }
  var s,
    f,
    p = {},
    g = (e || {})[n],
    m = Array.prototype.slice,
    h = "__ASQ__",
    y = Object.create(null);
  return (
    (s = u),
    (s.extend = function(n, e) {
      return (
        ~["then", "or", "gate", "pipe", "seq", "val", "abort"].indexOf(n) ||
          (p[n] = e),
        s
      );
    }),
    (s.messages = function() {
      var n = m.call(arguments);
      return r(n), n;
    }),
    (s.isSequence = function(n) {
      return a(n) && !Array.isArray(n);
    }),
    (s.isMessageWrapper = function(n) {
      return a(n) && Array.isArray(n);
    }),
    (s.unpause = function(n) {
      return n.unpause && n.unpause(), n;
    }),
    (s.noConflict = function() {
      return e && (e[n] = g), s;
    }),
    s
  );
});
/*! asynquence-contrib
    v0.1.10-b (c) Kyle Simpson
    MIT License: http://getify.mit-license.org
*/
!(function(n, t) {
  "undefined" != typeof module && module.exports
    ? (module.exports = t(require(n)))
    : "function" == typeof define && define.amd ? define([n], t) : t(n);
})(this.ASQ || "asynquence", function(n) {
  "use strict";
  var t = Array.prototype.slice,
    e = Object.create(null);
  return (
    n.extend("all", function(n) {
      return n.gate;
    }),
    n.extend("any", function(r, a) {
      return function() {
        if (a("seq_error") || a("seq_aborted") || 0 === arguments.length)
          return r;
        var u = t.call(arguments);
        return (
          r.then(function(r) {
            function a() {
              var n;
              o === u.length &&
                ((n = []),
                l
                  ? (u.forEach(function(t, e) {
                      n.push(c["s" + e]);
                    }),
                    r.apply(e, n))
                  : (u.forEach(function(t, e) {
                      n.push(s["s" + e]);
                    }),
                    r.fail.apply(e, n)));
            }
            var l = !1,
              o = 0,
              c = {},
              s = {},
              i = n.apply(e, t.call(arguments, 1));
            (u = u.map(function(u, i) {
              return function(p) {
                var f = t.call(arguments);
                (f[0] = function() {
                  (l = !0),
                    o++,
                    (c["s" + i] =
                      arguments.length > 1
                        ? n.messages.apply(e, arguments)
                        : arguments[0]),
                    a();
                }),
                  (f[0].fail = function() {
                    o++,
                      (s["s" + i] =
                        arguments.length > 1
                          ? n.messages.apply(e, arguments)
                          : arguments[0]),
                      a();
                  }),
                  (f[0].abort = function() {
                    l || (p.abort(), r.abort());
                  }),
                  u.apply(e, f);
              };
            })),
              i.gate.apply(e, u);
          }),
          r
        );
      };
    }),
    n.extend("errfcb", function(n) {
      return function() {
        var r = {
          then: function(n) {
            return (r.then_cb = n), r;
          },
          or: function(n) {
            return (r.or_cb = n), r;
          },
          __ASQ__: !0,
          next: !0
        };
        return (
          n.seq(r),
          function(n) {
            n ? r.or_cb(n) : r.then_cb.apply(e, t.call(arguments, 1));
          }
        );
      };
    }),
    n.extend("first", function(r, a) {
      return function() {
        if (a("seq_error") || a("seq_aborted") || 0 === arguments.length)
          return r;
        var u = t.call(arguments);
        return (
          r.then(function(r) {
            var a = 0,
              l = {},
              o = !1,
              c = n.apply(e, t.call(arguments, 1));
            (u = u.map(function(s, i) {
              return function(p) {
                var f = t.call(arguments);
                (f[0] = function() {
                  o ||
                    ((o = !0),
                    a++,
                    r(
                      arguments.length > 1
                        ? n.messages.apply(e, arguments)
                        : arguments[0]
                    ),
                    c.abort());
                }),
                  (f[0].fail = function() {
                    var t = [];
                    a++,
                      (l["s" + i] =
                        arguments.length > 1
                          ? n.messages.apply(e, arguments)
                          : arguments[0]),
                      o ||
                        a !== u.length ||
                        (u.forEach(function(n, e) {
                          t.push(l["s" + e]);
                        }),
                        r.fail.apply(e, t));
                  }),
                  (f[0].abort = function() {
                    o || (p.abort(), r.abort());
                  }),
                  s.apply(e, f);
              };
            })),
              c.gate.apply(e, u);
          }),
          r
        );
      };
    }),
    (function() {
      var t;
      n.iterable = function() {
        function e(n) {
          return "undefined" != typeof setImmediate
            ? setImmediate(n)
            : setTimeout(n, 0);
        }
        function r() {
          var n;
          if (((g = null), q.length > 0))
            for (; _.length > 0; ) {
              n = _.shift();
              try {
                n.apply(y, q);
              } catch (t) {
                checkBranding(t)
                  ? (q = q.concat(t))
                  : (q.push(t), t.stack && q.push(t.stack)),
                  0 === _.length && console.error.apply(console, q);
              }
            }
        }
        function a() {
          return v || b || 0 === arguments.length
            ? f
            : (d.push.apply(d, arguments), f);
        }
        function u() {
          return b || 0 === arguments.length
            ? f
            : (_.push.apply(_, arguments), g || (g = e(r)), f);
        }
        function l() {
          return b || 0 === arguments.length
            ? f
            : (m.call(arguments).forEach(function(n) {
                a(n).or(n.fail);
              }),
              f);
        }
        function o() {
          if (v || b || 0 === d.length)
            return (
              d.length > 0 && c("Sequence cannot be iterated"), { done: !0 }
            );
          try {
            return { value: d.shift().apply(y, arguments) };
          } catch (t) {
            return (
              n.isMessageWrapper(t)
                ? c.apply(y, t)
                : t.stack ? c(t, t.stack) : c(t),
              {}
            );
          }
        }
        function c() {
          return v || b
            ? f
            : (q.push.apply(q, arguments), (v = !0), g || (g = e(r)), f);
        }
        function s() {
          v ||
            b ||
            ((b = !0),
            clearTimeout(g),
            (g = null),
            (d.length = 0),
            (_.length = 0),
            (q.length = 0));
        }
        function i() {
          var e;
          return (
            (t = { val_queue: d.slice(0), or_queue: _.slice(0) }),
            (e = n.iterable()),
            (t = null),
            e
          );
        }
        function p(n) {
          return Object.defineProperty(n, h, { enumerable: !1, value: !0 }), n;
        }
        var f,
          g,
          m = Array.prototype.slice,
          h = "__ASQ__",
          y = Object.create(null),
          v = !1,
          b = !1,
          d = [],
          _ = [],
          q = [];
        return (
          (f = p({
            val: a,
            then: a,
            or: u,
            pipe: l,
            next: o,
            throw: c,
            abort: s,
            duplicate: i
          })),
          (f[
            ("object" == typeof Symbol && null != Symbol && Symbol.iterator) ||
              "@@iterator"
          ] = function() {
            return f;
          }),
          t && ((d = t.val_queue.slice(0)), (_ = t.or_queue.slice(0))),
          f.val.apply(y, arguments),
          f
        );
      };
    })(),
    n.extend("last", function(r, a) {
      return function() {
        if (a("seq_error") || a("seq_aborted") || 0 === arguments.length)
          return r;
        var u = t.call(arguments);
        return (
          r.then(function(r) {
            function a() {
              var n;
              o === u.length &&
                ((n = []),
                l
                  ? r(c)
                  : (u.forEach(function(t, e) {
                      n.push(s["s" + e]);
                    }),
                    r.fail.apply(e, n)));
            }
            var l = !1,
              o = 0,
              c = {},
              s = {},
              i = n.apply(e, t.call(arguments, 1));
            (u = u.map(function(u, i) {
              return function(p) {
                var f = t.call(arguments);
                (f[0] = function() {
                  (l = !0),
                    o++,
                    (c =
                      arguments.length > 1
                        ? n.messages.apply(e, arguments)
                        : arguments[0]),
                    a();
                }),
                  (f[0].fail = function() {
                    o++,
                      (s["s" + i] =
                        arguments.length > 1
                          ? n.messages.apply(e, arguments)
                          : arguments[0]),
                      a();
                  }),
                  (f[0].abort = function() {
                    l || (p.abort(), r.abort());
                  }),
                  u.apply(e, f);
              };
            })),
              i.gate.apply(e, u);
          }),
          r
        );
      };
    }),
    n.extend("map", function(r, a) {
      return function(u, l) {
        return a("seq_error") || a("seq_aborted")
          ? r
          : (r
              .seq(function() {
                var r,
                  a = t.call(arguments);
                return (
                  l || (l = a.shift()),
                  u || (u = a.shift()),
                  "function" == typeof u &&
                    Array.isArray(l) &&
                    ((r = u), (u = l), (l = r)),
                  n.apply(e, a).gate.apply(
                    e,
                    u.map(function(n) {
                      return function() {
                        l.apply(e, [n].concat(t.call(arguments)));
                      };
                    })
                  )
                );
              })
              .val(function() {
                return t.call(arguments);
              }),
            r);
      };
    }),
    n.extend("none", function(r, a) {
      return function() {
        if (a("seq_error") || a("seq_aborted") || 0 === arguments.length)
          return r;
        var u = t.call(arguments);
        return (
          r.then(function(r) {
            function a() {
              var n;
              o === u.length &&
                ((n = []),
                l
                  ? (u.forEach(function(t, e) {
                      n.push(c["s" + e]);
                    }),
                    r.fail.apply(e, n))
                  : (u.forEach(function(t, e) {
                      n.push(s["s" + e]);
                    }),
                    r.apply(e, n)));
            }
            var l = !1,
              o = 0,
              c = {},
              s = {},
              i = n.apply(e, t.call(arguments, 1));
            (u = u.map(function(u, i) {
              return function(p) {
                var f = t.call(arguments);
                (f[0] = function() {
                  (l = !0),
                    o++,
                    (c["s" + i] =
                      arguments.length > 1
                        ? n.messages.apply(e, arguments)
                        : arguments[0]),
                    a();
                }),
                  (f[0].fail = function() {
                    o++,
                      (s["s" + i] =
                        arguments.length > 1
                          ? n.messages.apply(e, arguments)
                          : arguments[0]),
                      a();
                  }),
                  (f[0].abort = function() {
                    l || (p.abort(), r.abort());
                  }),
                  u.apply(e, f);
              };
            })),
              i.gate.apply(e, u);
          }),
          r
        );
      };
    }),
    (n.react = function(t) {
      function e() {
        var n = r.duplicate();
        return n.unpause.apply(a, arguments), n;
      }
      var r,
        a = (Array.prototype.slice, Object.create(null));
      return (
        n(function() {
          t(e);
        }),
        (r = n().duplicate())
      );
    }),
    n.extend("runner", function(r, a) {
      return function() {
        if (a("seq_error") || a("seq_aborted") || 0 === arguments.length)
          return r;
        var u = t.call(arguments);
        return (
          r.then(function(r) {
            var a,
              l,
              o,
              c = t.call(arguments, 1);
            (u = u.map(function(t) {
              var u = t;
              return (
                "function" == typeof t &&
                t.constructor &&
                "GeneratorFunction" === t.constructor.name
                  ? ((u = t.apply(e, c)), (c = []))
                  : (n.isSequence(t) && "next" in t) ||
                    ((a = c.slice()),
                    (c = []),
                    (u = n.iterable().val(function() {
                      return t.apply(e, a);
                    }))),
                n.isSequence(u) &&
                  u.or(function() {
                    r.fail.apply(e, arguments);
                  }),
                u
              );
            })),
              (function s() {
                l = u.shift();
                try {
                  o = l.next.apply(l, c);
                } catch (a) {
                  return r.fail(a);
                }
                n.isSequence(o.value) ||
                  (o.value =
                    null !== o.value &&
                    ("object" == typeof o.value ||
                      "function" == typeof o.value) &&
                    "then" in o.value
                      ? n().promise(o.value)
                      : n(o.value)),
                  o.value
                    .val(function() {
                      o.done || ((c = t.call(arguments)), u.push(l)),
                        u.length > 0 ? s() : r.apply(e, c);
                    })
                    .or(function() {
                      l.throw.apply(e, arguments);
                    });
              })();
          }),
          r
        );
      };
    }),
    n.extend("try", function(r, a) {
      return function() {
        if (a("seq_error") || a("seq_aborted") || 0 === arguments.length)
          return r;
        var u = t.call(arguments).map(function(r) {
          return function(a) {
            var u = t.call(arguments),
              l = n.apply(e, u.slice(1));
            l
              .then(function() {
                r.apply(e, arguments);
              })
              .val(function() {
                a.apply(e, arguments);
              })
              .or(function() {
                var t = n.messages.apply(e, arguments);
                a({ catch: t.length > 1 ? t : t[0] });
              });
          };
        });
        return r.then.apply(e, u), r;
      };
    }),
    n.extend("until", function(r, a) {
      return function() {
        if (a("seq_error") || a("seq_aborted") || 0 === arguments.length)
          return r;
        var u = t.call(arguments).map(function(r) {
          return function a(u) {
            var l = t.call(arguments),
              o = n.apply(e, l.slice(1));
            o
              .then(function() {
                var n = t.call(arguments);
                (n[0].break = function() {
                  u.fail.apply(e, arguments), o.abort();
                }),
                  r.apply(e, n);
              })
              .val(function() {
                u.apply(e, arguments);
              })
              .or(function() {
                a.apply(e, l);
              });
          };
        });
        return r.then.apply(e, u), r;
      };
    }),
    n.extend("waterfall", function(r, a) {
      return function() {
        if (a("seq_error") || a("seq_aborted") || 0 === arguments.length)
          return r;
        var u = n.messages();
        return (
          t.call(arguments).forEach(function(t) {
            r.then(t).val(function() {
              var t = n.messages.apply(e, arguments);
              return u.push(t.length > 1 ? t : t[0]), u;
            });
          }),
          r
        );
      };
    }),
    {}
  );
});
