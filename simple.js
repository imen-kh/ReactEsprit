// var name = "World";
// avoid

const appName = "MyApp";
let counter = 0;
console.log(appName);
console.log(counter);
counter = 1;

// appName="AnotherApp"; // This will cause an error
// console.log(appName);

// Functions
function sumOld (a, b) {
    return a + b;   
}

const s = sumOld(2, 3);
const sum = (a, b) => a + b;
const welcome =() => { return "Welcome!"; }

const user = {
    id: 1,
    name: "Ismail",
    role: "Admin"
}

// Destructuring
const {name, role} = user;
console.log(name);
const array = [1, 2, 3, 4, 5];
const [first, second] = array;

console.log(first, second);

const updatedUser = {
    ...user,
    age: 10
}
console.log(updatedUser);

// map
const  double = array.map(n => n * 2);
console.log(double);

// filter
const even = array.filter(n => n % 2 === 0);
console.log(even);

const nestedArray = [
    [1, 2, 3],
    [4, 5],
    [6] 
]
const flatArray = nestedArray.flat();
console.log(flatArray);

const numbers = [10, 20, 30]
const total = numbers.reduce((acc, curr) => acc + curr, 0);
console.log(total);


const fetchData = async() => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Data fetched");
        }, 1000);
    });
}

const getData = async() => {
    const data = await fetchData();
    console.log(data);
}

getData();

const userA = {profile: { email: "test@example.com" } };
const noUser = null;

console.log(userA.profile.email);
console.log(noUser?.profile?.email); // Undefined

const score = 0;
console.log(score || "No Score"); // No Score
console.log(score ?? "No Score"); // 0

// 1. DATA: Simulating an API response (some data is missing!)
const rawData = [
  { id: 1, name: "Alice", details: { age: 25, active: true } },
  { id: 2, name: "Bob", details: null }, // Missing details
  { id: 3, name: "Charlie", details: { age: 0, active: false } } // Age is 0
];

const processUsers = async () => {
  console.log("--- Fetching Data ---");
  // Simulate network delay (Async/Await)
  await new Promise(resolve => setTimeout(resolve, 1000));
  // Process the list
  const cleanList = rawData.map((user) => {
    // Destructuring
    const { name, details } = user;
    // Optional Chaining: safely access 'active' even if 'details' is null
    const isActive = details?.active;
    // Nullish Coalescing: valid age is 0, so we use ?? instead of ||
    // If details.age is null/undefined, fallback to "Unknown"
    const age = details?.age ?? "Unknown";
    return `User: ${name} | Age: ${age} | Status: ${isActive ? "Active" : "Inactive"}`;
  });
  // Spread Operator: Add a summary at the end
  const finalReport = [...cleanList, "--- End of Report ---"];
  console.log(finalReport.join("\n"));
};

// Run it
processUsers();