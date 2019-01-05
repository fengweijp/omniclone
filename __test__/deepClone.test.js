const omniclone = require("../src/deepClone");

describe("it works", () => {
  it("should work", () => {
    expect(true).toBe(true);
  });
});

describe("omniclone", () => {
  it("should import omniclone", () => {
    const t = omniclone();
    expect(t).toBeDefined();
  });

  it(`should set setPrototype to false, invokeConstructors to true,
      copyNonEnumerables to false, copySymbols to false, copyGettersSetters to false and
      allowCircularReferences to false if there the config argument is undefined`, () => {
    (() => {
      let i = 0;
      class Test {
        constructor() {
          i += 1;
        }
      }
      const testObj = new Test();

      Object.defineProperty(testObj, "notEnum", {
        enumerable: false,
        value: 42
      });
      testObj.symbol = Symbol("symbol");
      Object.defineProperty(testObj, "g&s", {
        get: () => 42,
        set: () => {}
      });

      const res = omniclone(testObj);

      expect(i).toBe(2); // +1 because of the call to create testObj
      expect(res.constructor).toBe(Test);
      expect(Object.getPrototypeOf(res)).toBe(Test.prototype);
      expect(res.notEnum).toBeUndefined();
      expect(res.symbol).toBeUndefined();
      expect(res["g&s"]).toBeUndefined();
    })();

    expect(() => {
      const ob1 = {};
      ob1.ob1 = ob1;
      omniclone(ob1);
    }).toThrow(TypeError("TypeError: circular reference found"));
  });

  it("should throw a TypeError when omniclone is called with an invalid 'obj' argument's type", () => {
    expect(() => {
      omniclone(null);
    }).toThrow(TypeError("TypeError: invalid 'obj' argument's type"));

    expect(() => {
      omniclone(() => {});
    }).toThrow(TypeError("TypeError: invalid 'obj' argument's type"));

    expect(() => {
      omniclone("foo");
    }).toThrow(TypeError("TypeError: invalid 'obj' argument's type"));

    expect(() => {
      omniclone(42);
    }).toThrow(TypeError("TypeError: invalid 'obj' argument's type"));

    expect(() => {
      omniclone(Symbol("test"));
    }).toThrow(TypeError("TypeError: invalid 'obj' argument's type"));
  });

  it("should throw a TypeError when omniclone is called with an Error object", () => {
    expect(() => {
      omniclone(new Error());
    }).toThrow(TypeError("TypeError: cannot copy Error objects"));

    expect(() => {
      class CustomError extends Error {}
      omniclone(new CustomError());
    }).toThrow(TypeError("TypeError: cannot copy Error objects"));
  });

  it("should throw a TypeError when the setPrototype flag setted into the config object passed to omniclone has not Boolean type", () => {
    expect(() => {
      omniclone({}, { setPrototype: () => {} });
    }).toThrow(TypeError("TypeError: invalid 'setPrototype' flag's type"));

    expect(() => {
      omniclone({}, { setPrototype: {} });
    }).toThrow(TypeError("TypeError: invalid 'setPrototype' flag's type"));

    expect(() => {
      omniclone({}, { setPrototype: 42 });
    }).toThrow(TypeError("TypeError: invalid 'setPrototype' flag's type"));

    expect(() => {
      omniclone({}, { setPrototype: "" });
    }).toThrow(TypeError("TypeError: invalid 'setPrototype' flag's type"));

    expect(() => {
      omniclone({}, { setPrototype: "foo" });
    }).toThrow(TypeError("TypeError: invalid 'setPrototype' flag's type"));

    expect(() => {
      omniclone({}, { setPrototype: null });
    }).toThrow(TypeError("TypeError: invalid 'setPrototype' flag's type"));
  });

  it("should throw a TypeError when the invokeConstructors flag setted into the config object passed to omniclone has not Boolean type", () => {
    expect(() => {
      omniclone({}, { invokeConstructors: () => {} });
    }).toThrow(
      TypeError("TypeError: invalid 'invokeConstructors' flag's type")
    );

    expect(() => {
      omniclone({}, { invokeConstructors: {} });
    }).toThrow(
      TypeError("TypeError: invalid 'invokeConstructors' flag's type")
    );

    expect(() => {
      omniclone({}, { invokeConstructors: 42 });
    }).toThrow(
      TypeError("TypeError: invalid 'invokeConstructors' flag's type")
    );

    expect(() => {
      omniclone({}, { invokeConstructors: "" });
    }).toThrow(
      TypeError("TypeError: invalid 'invokeConstructors' flag's type")
    );

    expect(() => {
      omniclone({}, { invokeConstructors: "foo" });
    }).toThrow(
      TypeError("TypeError: invalid 'invokeConstructors' flag's type")
    );

    expect(() => {
      omniclone({}, { invokeConstructors: null });
    }).toThrow(
      TypeError("TypeError: invalid 'invokeConstructors' flag's type")
    );
  });

  it("should throw a TypeError when the copyNonEnumerables flag setted into the config object passed to omniclone has not Boolean type", () => {
    expect(() => {
      omniclone({}, { copyNonEnumerables: () => {} });
    }).toThrow(
      TypeError("TypeError: invalid 'copyNonEnumerables' flag's type")
    );

    expect(() => {
      omniclone({}, { copyNonEnumerables: {} });
    }).toThrow(
      TypeError("TypeError: invalid 'copyNonEnumerables' flag's type")
    );

    expect(() => {
      omniclone({}, { copyNonEnumerables: 42 });
    }).toThrow(
      TypeError("TypeError: invalid 'copyNonEnumerables' flag's type")
    );

    expect(() => {
      omniclone({}, { copyNonEnumerables: "" });
    }).toThrow(
      TypeError("TypeError: invalid 'copyNonEnumerables' flag's type")
    );

    expect(() => {
      omniclone({}, { copyNonEnumerables: "foo" });
    }).toThrow(
      TypeError("TypeError: invalid 'copyNonEnumerables' flag's type")
    );

    expect(() => {
      omniclone({}, { copyNonEnumerables: null });
    }).toThrow(
      TypeError("TypeError: invalid 'copyNonEnumerables' flag's type")
    );
  });

  it("should throw a TypeError when the copySymbols flag setted into the config object passed to omniclone has not Boolean type", () => {
    expect(() => {
      omniclone({}, { copySymbols: () => {} });
    }).toThrow(TypeError("TypeError: invalid 'copySymbols' flag's type"));

    expect(() => {
      omniclone({}, { copySymbols: {} });
    }).toThrow(TypeError("TypeError: invalid 'copySymbols' flag's type"));

    expect(() => {
      omniclone({}, { copySymbols: 42 });
    }).toThrow(TypeError("TypeError: invalid 'copySymbols' flag's type"));

    expect(() => {
      omniclone({}, { copySymbols: "" });
    }).toThrow(TypeError("TypeError: invalid 'copySymbols' flag's type"));

    expect(() => {
      omniclone({}, { copySymbols: "foo" });
    }).toThrow(TypeError("TypeError: invalid 'copySymbols' flag's type"));

    expect(() => {
      omniclone({}, { copySymbols: null });
    }).toThrow(TypeError("TypeError: invalid 'copySymbols' flag's type"));
  });

  it("should throw a TypeError when the copyGettersSetters flag setted into the config object passed to omniclone has not Boolean type", () => {
    expect(() => {
      omniclone({}, { copyGettersSetters: () => {} });
    }).toThrow(
      TypeError("TypeError: invalid 'copyGettersSetters' flag's type")
    );

    expect(() => {
      omniclone({}, { copyGettersSetters: {} });
    }).toThrow(
      TypeError("TypeError: invalid 'copyGettersSetters' flag's type")
    );

    expect(() => {
      omniclone({}, { copyGettersSetters: 42 });
    }).toThrow(
      TypeError("TypeError: invalid 'copyGettersSetters' flag's type")
    );

    expect(() => {
      omniclone({}, { copyGettersSetters: "" });
    }).toThrow(
      TypeError("TypeError: invalid 'copyGettersSetters' flag's type")
    );

    expect(() => {
      omniclone({}, { copyGettersSetters: "foo" });
    }).toThrow(
      TypeError("TypeError: invalid 'copyGettersSetters' flag's type")
    );

    expect(() => {
      omniclone({}, { copyGettersSetters: null });
    }).toThrow(
      TypeError("TypeError: invalid 'copyGettersSetters' flag's type")
    );
  });

  it("should throw a TypeError when the allowCircularReferences flag setted into the config object passed to omniclone has not Boolean type", () => {
    expect(() => {
      omniclone({}, { allowCircularReferences: () => {} });
    }).toThrow(
      TypeError("TypeError: invalid 'allowCircularReferences' flag's type")
    );

    expect(() => {
      omniclone({}, { allowCircularReferences: {} });
    }).toThrow(
      TypeError("TypeError: invalid 'allowCircularReferences' flag's type")
    );

    expect(() => {
      omniclone({}, { allowCircularReferences: 42 });
    }).toThrow(
      TypeError("TypeError: invalid 'allowCircularReferences' flag's type")
    );

    expect(() => {
      omniclone({}, { allowCircularReferences: "" });
    }).toThrow(
      TypeError("TypeError: invalid 'allowCircularReferences' flag's type")
    );

    expect(() => {
      omniclone({}, { allowCircularReferences: "foo" });
    }).toThrow(
      TypeError("TypeError: invalid 'allowCircularReferences' flag's type")
    );

    expect(() => {
      omniclone({}, { allowCircularReferences: null });
    }).toThrow(
      TypeError("TypeError: invalid 'allowCircularReferences' flag's type")
    );
  });

  it("should set proper constructor property and the [[Prototype]] property equals to the constructor.prototype when the invokeConstructors flag is set to true", () => {
    (() => {
      let i = 0;
      class Test {
        constructor() {
          i += 1;
        }
      }
      const testObj = new Test();
      const res = omniclone(testObj);

      expect(i).toBe(2); // +1 because of the call to create testObj
      expect(res.constructor).toBe(Test);
      expect(Object.getPrototypeOf(res)).toBe(Test.prototype);
    })();

    (() => {
      let i = 0;
      class Test {
        constructor() {
          i += 1;
        }
      }
      const testObj = new Test();
      const res = omniclone(testObj, { invokeConstructors: true });

      expect(i).toBe(2); // +1 because of the call to create testObj
      expect(res.constructor).toBe(Test);
      expect(Object.getPrototypeOf(res)).toBe(Test.prototype);
    })();

    (() => {
      let i = 0;
      class Test {
        constructor() {
          i += 1;
        }
      }
      const testObj = new Test();
      const res = omniclone(testObj, {
        invokeConstructors: true,
        setPrototype: true
      });

      expect(i).toBe(2); // +1 because of the call to create testObj
      expect(res.constructor).toBe(Test);
      expect(Object.getPrototypeOf(res)).toBe(Test.prototype);
    })();

    (() => {
      let i = 0;
      class Test {
        constructor() {
          i += 1;
        }
      }
      const testObj = new Test();
      const res = omniclone(testObj, { setPrototype: true });

      expect(i).toBe(2); // +1 because of the call to create testObj
      expect(res.constructor).toBe(Test);
      expect(Object.getPrototypeOf(res)).toBe(Test.prototype);
    })();
  });

  it("should set proper constructor property and the [[Prototype]] property equals to the source [[Prototype]] when the invokeConstructors flag is set to false and setPrototype flag is set to true", () => {
    (() => {
      let i = 0;
      class Test {
        constructor() {
          i += 1;
        }
      }
      const testObj = new Test();
      const res = omniclone(testObj, {
        invokeConstructors: false,
        setPrototype: true
      });

      expect(i).toBe(1); // +1 because of the call to create testObj
      expect(res.constructor).toBe(Test);
      expect(Object.getPrototypeOf(res)).toBe(Object.getPrototypeOf(testObj));
    })();
  });

  it("should set the `constructor` prop to the `Object` function, and the `[[Prototype]]` prop to `Object.prototype` when both the invokeConstructors and the setPrototype flag are set to false", () => {
    (() => {
      let i = 0;
      class Test {
        constructor() {
          i += 1;
        }
      }
      const testObj = new Test();
      const res = omniclone(testObj, {
        invokeConstructors: false,
        setPrototype: false
      });

      expect(i).toBe(1); // +1 because of the call to create testObj
      expect(res.constructor).toBe(Object);
      expect(Object.getPrototypeOf(res)).toBe(Object.prototype);
    })();
  });

  it("should not copy non-enumerables properties if the copyNonEnumerables flag is set to false", () => {
    (() => {
      const obj = {};
      Object.defineProperty(obj, "prop", { enumerable: false, value: 42 });

      const res = omniclone(obj);

      expect(res.prop).toBeUndefined();
    })();

    (() => {
      const obj = {};
      Object.defineProperty(obj, "prop", { enumerable: false, value: 42 });

      const res = omniclone(obj, { copyNonEnumerables: false });

      expect(res.prop).toBeUndefined();
    })();
  });

  it("should copy non-enumerables properties if the copyNonEnumerables flag is set to true", () => {
    (() => {
      const obj = {};
      Object.defineProperty(obj, "prop", { enumerable: false, value: 42 });

      const res = omniclone(obj, { copyNonEnumerables: true });

      expect(res.prop).toBe(42);
    })();
  });

  it("should not copy symbols if the copySymbols flag is set to false", () => {
    (() => {
      const obj = {};
      obj.s = Symbol("s");
      const res = omniclone(obj);
      expect(res.s).toBeUndefined();
    })();

    (() => {
      const obj = {};
      obj.s = Symbol("s");
      const res = omniclone(obj, { copySymbols: false });
      expect(res.s).toBeUndefined();
    })();
  });

  it("should shallow copy symbols if the copySymbols flag is set to true", () => {
    (() => {
      const obj = {};
      obj.s = Symbol("s");
      const res = omniclone(obj, { copySymbols: true });
      expect(res.s).toBe(obj.s);
    })();
  });

  it("should not copy getters&setters if the copyGettersSetters flag is set to false", () => {
    (() => {
      const testObj = {};
      Object.defineProperty(testObj, "g&s", {
        get: () => 42,
        set: () => {}
      });
      // copyNonEnumerables: true because in this case set&get are not enumerable
      const res = omniclone(testObj, { copyNonEnumerables: true });
      expect(res["g&s"]).toBeUndefined();
    })();

    (() => {
      const testObj = {};
      Object.defineProperty(testObj, "g&s", {
        get: () => 42,
        set: () => {}
      });
      const res = omniclone(testObj, { copyGettersSetters: false });
      expect(res["g&s"]).toBeUndefined();
    })();
  });

  it("should shallow copy getters&setters if the copyGettersSetters flag is set to true", () => {
    (() => {
      const testObj = {};
      Object.defineProperty(testObj, "g&s", {
        get: () => 42,
        set: () => {}
      });
      // copyNonEnumerables: true because in this case set&get are also not enumerable
      const res = omniclone(testObj, {
        copyGettersSetters: true,
        copyNonEnumerables: true
      });
      expect(res["g&s"]).toBeDefined();
    })();
  });

  it("should throw a TypeError when there is a circular reference and the allowCircularReferences is set to false", () => {
    (() => {
      const ob1 = {};
      ob1.ob1 = ob1;
      expect(() => {
        omniclone(ob1);
      }).toThrow(TypeError("TypeError: circular reference found"));
    })();

    (() => {
      const ob1 = {};
      const ob2 = { ob1 };
      ob1.ob2 = ob2;
      expect(() => {
        omniclone(ob1);
      }).toThrow(TypeError("TypeError: circular reference found"));
    })();
  });

  it("should not throw a TypeError when there is a circular reference and the allowCircularReferences is set to true", () => {
    (() => {
      const ob1 = {};
      ob1.ob1 = ob1;
      expect(() => {
        omniclone(ob1, { allowCircularReferences: true });
      }).toBeDefined();
    })();

    (() => {
      const ob1 = {};
      const ob2 = { ob1 };
      ob1.ob2 = ob2;
      expect(() => {
        omniclone(ob1, { allowCircularReferences: true });
      }).toBeDefined();
    })();

    (() => {
      const ob1 = {};
      const ob2 = {};
      const ob3 = {};
      const ob4 = {};
      ob1.ob2 = ob2;
      ob1.ob4 = ob4;
      ob2.ob3 = ob3;
      ob4.ob3 = ob3;
      ob3.ob1 = ob1;

      expect(() => {
        omniclone(ob1, { allowCircularReferences: true });
      }).toBeDefined();
    })();
  });

  it("should throw a TypeError when a prop is an Error object", () => {
    (() => {
      class MyError extends Error {}
      const ob1 = { p: new MyError() };
      expect(() => {
        omniclone(ob1);
      }).toThrow(TypeError("TypeError: cannot copy Error objects"));
    })();
  });

  it("should throw a TypeError when a String object is passed as source", () => {
    expect(() => {
      const str = new String("foo");
      omniclone(str);
    }).toThrow(
      TypeError("TypeError: wrapper objects are not allowed as source")
    );
  });

  it("should convert String objects into primitive values ", () => {
    (() => {
      const str = { s: new String("foo") };
      const res = omniclone(str);
      expect(res.s).toBe("foo");
    })();
  });

  it("should throw a TypeError when a Number object is passed as source", () => {
    expect(() => {
      const n = new Number("1");
      omniclone(n);
    }).toThrow(
      TypeError("TypeError: wrapper objects are not allowed as source")
    );
  });

  it("should convert Number objects into primitive values ", () => {
    (() => {
      const nb = { n: new Number("1") };
      const res = omniclone(nb);
      expect(res.n).toBe(1);
    })();
  });

  it("should throw a TypeError when a Boolean object is passed as source", () => {
    expect(() => {
      const b = new Boolean(true);
      omniclone(b);
    }).toThrow(
      TypeError("TypeError: wrapper objects are not allowed as source")
    );
  });

  it("should convert Boolean objects into primitive values ", () => {
    (() => {
      const bo = { b: new Boolean(true) };
      const res = omniclone(bo);
      expect(res.b).toBe(true);
    })();
  });

  it("should throw a TypeError when a Promise object is passed as source", () => {
    expect(() => {
      omniclone(Promise.resolve());
    }).toThrow(TypeError("TypeError: Promises are not allowed as source"));
  });

  it("should shallow copy a Promise prop", () => {
    const p = Promise.resolve();
    const ob1 = { p };
    const res = omniclone(ob1);
    expect(res.p).toBe(ob1.p);
  });

  it("should clone a RegExp if it is passed as source", () => {
    (() => {
      const r = new RegExp("foo", "g");
      r.lastIndex = 10;
      const res = omniclone(r);
      expect(res.flags).toBe(r.flags);
      expect(res.source).toBe(r.source);
      expect(res.lastIndex).toBe(r.lastIndex);
    })();
  });

  it("should clone a RegExp property", () => {
    (() => {
      const r = new RegExp("foo", "g");
      r.lastIndex = 10;
      const ob1 = { r };
      const res = omniclone(ob1);
      expect(res.r.flags).toBe(ob1.r.flags);
      expect(res.r.source).toBe(ob1.r.source);
      expect(res.r.lastIndex).toBe(ob1.r.lastIndex);
    })();
  });

  it("should clone a Date if it is passed as source", done => {
    (() => {
      const d = new Date();
      new Promise(ok => {
        setTimeout(ok, 2000);
      }).then(() => {
        const res = omniclone(d);
        expect(res.getTime()).toBe(d.getTime());
        done();
      });
    })();
  });

  it("should clone a Date property", done => {
    (() => {
      const d = new Date();
      const ob1 = { d };
      new Promise(ok => {
        setTimeout(ok, 2000);
      }).then(() => {
        const res = omniclone(ob1);
        expect(res.d.getTime()).toBe(ob1.d.getTime());
        done();
      });
    })();
  });
});
