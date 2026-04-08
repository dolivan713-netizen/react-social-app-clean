interface State  {
    tasks: Task[];
};
interface Task  {
    id: number,
    text: string,
    completed: boolean,
};  

// let newTask: Task = {
//     id: Date.now(),
//     text: task,
//     completed: false
// };    

let state: State = {
    tasks: []
};




let data: string | number;
data = 5;
type DataValue = {
    firstName: string;
    age: number;
};
const dataServer: DataValue = {
    firstName: 'dd',
    age: 22,
}
//console.log(dataServer);
type server = {
    num1: number 
}
type SuperType = {
    name: string;
}
type SubType = {
    name: string;
    age: number;
}

const subType: SubType = {name: 'sub', age: 22};
const superType: SuperType = subType;
const superType2: SuperType = {name: 'ee'}
function goData(data: unknown) {
    let value: number;
    if (typeof data === 'number') {
        value = data;
    }
}

interface Address  {
    city: string;
    street?: string;
};
// // type User = {
// //     firstName: string;
// //     lastName: string;
// //     address: Address;
// // };
// const user: User = {
//     firstName: 'ff',
//     lastName: 'dd',
//     address: {
//         city: 'Moscow',
//         //street: 'Hill'
//     }
// }

type Color = 'gg' | 'red';
const value = {
    color: 'gg'
} as const;
function paint(color: Color) {

}
paint(value.color);

type EventName = 'click' | 'change';
type EventHandler = `on${EventName}`;
type UserId = `user_id_${string}`;
const user22: UserId = `user_id_${'ivan'}`

interface User {
    username: string;
    id: string;
    createdAt: number;
};
interface Article {
    age: number
}
interface ApiResponse<Data1, Data2> {
    status: 'error' | 'success';
    meta?: Data1;
    requestId?: string;
    data: Data2;

}
const apiResp: ApiResponse<Article, User> = {
    status: 'error',
    meta: {
        age: 22
    },
    requestId: 'gg',
    data: {
        username: 'gg',
        id: 'js',
        createdAt: 2026,
    }

}

type Tree<T> = {
    id: string;
    value: T;
    children: Tree<T>[] | null;
};

const data22: Tree<User> = {
    id: 'go',
    value: {
        username: 'dd',
        id: 'dd',
        createdAt: 2022,
    },
    children: [
        {
           id: 'go',
        value: {
        username: 'dd',
        id: 'dd',
        createdAt: 2022,
        },
        children: null,
        }
    ]
};

interface ServerAsk<T> {
    id: string;
    value: T;
    children: Tree<T>
}

const serverAsk: ServerAsk<User> = {
    id: 'ss',
    value: {
        username: 'dd',
        id: 'dd',
        createdAt: 2222,
    },
    children: { id: 'go',
    value: {
        username: 'dd',
        id: 'dd',
        createdAt: 2022,
    },
    children: [
        {
           id: 'go',
        value: {
        username: 'dd',
        id: 'dd',
        createdAt: 2022,
        },
        children: null,
        }
    ]
    }
}

function genericFn<T>(arg: T) {
    return arg
}
const bla: User = {
    username: 'dd',
    id: 'gg',
    createdAt: 55
    
}
genericFn<User>(bla);
function identity<T>(arg: T): T [] {
  return [arg] 
}
console.log(identity('ww'));

function firstElement<T>(arr: T[]): T | undefined {
  return arr[0];
}

const numbers = [1, 2, 3];
const firstNum = firstElement(numbers); // firstNum: number
console.log(firstNum)

const strings = ["a", "b", "c"];
const firstStr = firstElement(strings); // firstStr: string



// interface HasLength {
//   length: number;
// }

// function logLength<T extends HasLength>(arg: T): T {
//   console.log(arg.length);
//   return arg;
// }

interface NumStr {
    str: string;
    num: number;
}
function goooo<N = number, S = string>(arg: [N, S]): [S, N] {
    return [arg[1], arg[0]]
};
const hhh = goooo([1, 'dd']);
//console.log(hhh);
function go<S = string, N = number>(arg: [S, N]): [N, S] {
    return [arg[1], arg[0]]
};
function learn<T extends {str: string, num: number}>(arg: T) {
    return [
        {
        str: arg.str,
        num: arg.num
        }
    ]
};
interface Mass  {
    str: string;
    num: number;
};
const hh: Mass = {
    str: 'ff',
    num: 22
}
const jjj = learn(hh);
//console.log(jjj);
type Gen<T> = T extends [number] ? true : false;
const chert: Gen<[1]> = true;
interface BaseCar  {
    maxspeed: number;
    weight: number
};
interface Bmw extends BaseCar {
    type: 'bmw';
    bmwField: string
};
interface Audi extends BaseCar {
    type: 'audi';
    audiField: string;
};
type Car = Audi | Bmw;

function fnn(arg: Car) {
    switch (arg.type) {
        case 'audi': 
            arg.audiField
            break;
        case 'bmw':
            arg.bmwField
            break;

            default:
            arg
    }
}
interface PrimerPreobrozovaniy {
    name: string;
    age: number;
}
const prim1 = {
    name: 'gg',
    age: 22
} as PrimerPreobrozovaniy;

// const prim2  = <PrimerPreobrozovaniy> {
//     name: 'gg',
//     age: 22
// };

const prim3 = {
    name: 'gg',
    age: 22
} satisfies PrimerPreobrozovaniy;

const prim4 = {
    name: 'name',
    age: 'age'
}

function fn22<T extends object>(data: T): Array<keyof T> {
    return Object.keys(data) as Array<keyof T>
}
const k = fn22(prim4)
//console.log(k)
const color = 'red';
type RedColor = typeof color;
const green: RedColor = 'red';
function getData(user: PrimerPreobrozovaniy): number {
    return 5
};
type GetData = typeof getData;
type GetDataRetern = ReturnType<typeof getData>;
type GetDataParametr = Parameters<typeof getData>;
function fn1<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}
const key = fn1(prim4, 'name');
//console.log(key)

interface Person {
    name: string;
    adress?: {
        street: string
    };
    getAge?: () => number;
    array?: string;
};
function prepareUser(user: Person) {
    console.log(user.adress?.street);
    console.log(user.getAge?.());
    console.log(user.array?.[0]);
}
//prepareUser({name: 'hh'});

const Color1 = {
    RED: 'red',
    GREEN: 'green',
    YELLOW: 'yellow'
} as const;

type ValueOf<T> = T[keyof T];
type Color1 = typeof Color1[keyof typeof Color1];

enum Color2 {
    RED = 'red',
    GREEN = 'green',
    YELLOW = 'yellow'
};

enum Color3 {
    RED,
    GREEN = 3,
    YELLOW, 
}

function setColor(color: Color2) {
};

interface User1  {
    name: string;
    age: number;
};
type ReadonalyType<T> = {
    readonly [K in keyof T]?: T[K]
};
type NewUser = ReadonalyType<User1>;

interface Random {
    name: string;
    type: string;
};

interface User999 {
    name: string;
    age: number;
    type: string;
};

type WithoutType<T> = {
    [K in keyof T as Exclude<K, 'type'>]: T[K];
}
type NewUser1 = Pick<User999, 'name' | 'age'>;
type NewUser2 = Omit<User999, 'name'>;
type Color4 = 'red' | 'green' | 'blue';
type ExColor = Exclude<Color4, 'blue'>;
type ExColor2 = Extract<Color4, 'blue'>;

function fn2(arg1: string, arg2: number): string {
    return ''
}
type MyParametrs<T>
 = T extends (...arg: infer U) => any ? U : never;

 interface Lengthwise {
    length: number;
}

// T должен иметь свойство length
function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(`Длина: ${arg.length}`);
    return arg;
}

loggingIdentity("Привет"); // OK, строка имеет свойство length
loggingIdentity([1, 2, 3]); // OK, массив имеет свойство length
// loggingIdentity(3); // Ошибка: число не имеет свойства length