// Quiz data
export const quizzes = [
    {
        title: "General Knowledge Quiz",
        questions: [
            {
                question: "What is the capital of France?",
                options: ["Berlin", "Madrid", "Paris", "Rome"],
                correctAnswer: 2,
            },
            {
                question: "Who wrote 'Hamlet'?",
                options: ["Charles Dickens", "William Shakespeare", "Mark Twain", "Leo Tolstoy"],
                correctAnswer: 1,
            },
            {
                question: "What is the largest ocean on Earth?",
                options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
                correctAnswer: 3,
            },
            {
                question: "What is the tallest mountain in the world?",
                options: ["K2", "Mount Everest", "Kangchenjunga", "Makalu"],
                correctAnswer: 1,
            },
            {
                question: "Which country is the largest by land area?",
                options: ["Canada", "Russia", "China", "United States"],
                correctAnswer: 1,
            },
            {
                question: "Who painted the Mona Lisa?",
                options: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Claude Monet"],
                correctAnswer: 1,
            },
            {
                question: "What is the longest river in the world?",
                options: ["Amazon River", "Nile River", "Yangtze River", "Mississippi River"],
                correctAnswer: 1,
            },
            {
                question: "Which planet is known as the Red Planet?",
                options: ["Venus", "Mars", "Jupiter", "Saturn"],
                correctAnswer: 1,
            },
            {
                question: "What is the smallest country in the world?",
                options: ["Monaco", "Vatican City", "San Marino", "Liechtenstein"],
                correctAnswer: 1,
            },
            {
                question: "What is the currency of Japan?",
                options: ["Yuan", "Won", "Yen", "Ringgit"],
                correctAnswer: 2,
            },
        ],
    },
    {
        title: "Math Quiz",
        questions: [
            {
                question: "What is 2 + 2?",
                options: ["3", "4", "5", "6"],
                correctAnswer: 1,
            },
            {
                question: "What is the square root of 16?",
                options: ["2", "3", "4", "5"],
                correctAnswer: 2,
            },
            {
                question: "What is 9 x 9?",
                options: ["72", "81", "90", "100"],
                correctAnswer: 1,
            },
            {
                question: "What is the value of Pi (π) to two decimal places?",
                options: ["3.14", "3.16", "3.12", "3.00"],
                correctAnswer: 0,
            },
            {
                question: "What is 12 ÷ 4?",
                options: ["3", "4", "5", "6"],
                correctAnswer: 0,
            },
            {
                question: "What is the square of 5?",
                options: ["20", "25", "30", "35"],
                correctAnswer: 1,
            },
            {
                question: "What is the cube of 3?",
                options: ["6", "9", "18", "27"],
                correctAnswer: 3,
            },
            {
                question: "What is 15 - 7?",
                options: ["6", "7", "8", "9"],
                correctAnswer: 2,
            },
            {
                question: "What is 25 + 25?",
                options: ["40", "50", "60", "70"],
                correctAnswer: 1,
            },
            {
                question: "What is the sum of the first 10 positive integers?",
                options: ["45", "50", "55", "60"],
                correctAnswer: 1,
            },
        ],
    },
    {
        title: "JavaScript Quiz",
        questions: [
            {
                question: "What is the correct syntax for a JavaScript function?",
                options: ["function = myFunction()", "function myFunction()", "def myFunction()", "function: myFunction()"],
                correctAnswer: 1,
            },
            {
                question: "How do you declare a variable in JavaScript?",
                options: ["var", "let", "const", "All of the above"],
                correctAnswer: 3,
            },
            {
                question: "Which symbol is used for comments in JavaScript?",
                options: ["//", "/*", "#", "--"],
                correctAnswer: 0,
            },
            {
                question: "What will `typeof 42` return?",
                options: ["string", "number", "object", "undefined"],
                correctAnswer: 1,
            },
            {
                question: "Which of the following is a JavaScript data type?",
                options: ["string", "number", "boolean", "All of the above"],
                correctAnswer: 3,
            },
            {
                question: "What is the correct way to create an object in JavaScript?",
                options: ["let obj = []", "let obj = {}", "let obj = new Object()", "let obj = new Array()"],
                correctAnswer: 1,
            },
            {
                question: "Which of the following is used to create a new array in JavaScript?",
                options: ["[]", "{}", "Array()", "All of the above"],
                correctAnswer: 3,
            },
            {
                question: "How do you check if a number is NaN in JavaScript?",
                options: ["isNaN()", "Number.isNaN()", "isNaNNumber()", "NaN()"],
                correctAnswer: 1,
            },
            {
                question: "Which method is used to add an item at the end of an array?",
                options: ["push()", "pop()", "shift()", "unshift()"],
                correctAnswer: 0,
            },
            {
                question: "What is the result of `1 == '1'` in JavaScript?",
                options: ["true", "false", "undefined", "NaN"],
                correctAnswer: 0,
            },
        ],
    },
    {
        title: "Python Quiz",
        questions: [
            {
                question: "What is the correct syntax to output 'Hello World' in Python?",
                options: ["echo 'Hello World'", "print('Hello World')", "println('Hello World')", "echo('Hello World')"],
                correctAnswer: 1,
            },
            {
                question: "What is a list in Python?",
                options: ["A function", "A sequence of values", "A variable", "A class"],
                correctAnswer: 1,
            },
            {
                question: "Which of the following is used for a comment in Python?",
                options: ["//", "#", "/*", "--"],
                correctAnswer: 1,
            },
            {
                question: "Which of the following is a valid Python variable name?",
                options: ["my_var", "my-var", "my var", "my$var"],
                correctAnswer: 0,
            },
            {
                question: "What is the output of `print(type(5))`?",
                options: ["int", "float", "str", "None"],
                correctAnswer: 0,
            },
            {
                question: "How do you create a function in Python?",
                options: ["def function_name()", "function function_name()", "create function_name()", "func function_name()"],
                correctAnswer: 0,
            },
            {
                question: "Which keyword is used to define a class in Python?",
                options: ["class", "def", "function", "struct"],
                correctAnswer: 0,
            },
            {
                question: "What is the default return value of a Python function that does not have a return statement?",
                options: ["None", "0", "null", "undefined"],
                correctAnswer: 0,
            },
            {
                question: "How do you access elements in a Python dictionary?",
                options: ["d['key']", "d.key", "d{key}", "d.get('key')"],
                correctAnswer: 0,
            },
            {
                question: "Which of the following is used for exception handling in Python?",
                options: ["try-except", "try-catch", "throw-catch", "catch-throw"],
                correctAnswer: 0,
            },
        ],
    },
    {
        title: "HTML Quiz",
        questions: [
            {
                question: "Which tag is used to define a hyperlink in HTML?",
                options: ["<a>", "<link>", "<href>", "<hyperlink>"],
                correctAnswer: 0,
            },
            {
                question: "Which attribute is used to specify the source of an image?",
                options: ["src", "href", "alt", "srcset"],
                correctAnswer: 0,
            },
            {
                question: "What does the `<h1>` tag represent in HTML?",
                options: ["Header 1", "Heading 1", "Head 1", "Heading Title 1"],
                correctAnswer: 1,
            },
            {
                question: "What is the correct way to comment in HTML?",
                options: ["<!-- This is a comment -->", "// This is a comment", "<!-- This is a comment", "/* This is a comment */"],
                correctAnswer: 0,
            },
            {
                question: "Which of the following is used to define a table in HTML?",
                options: ["<table>", "<tr>", "<td>", "<th>"],
                correctAnswer: 0,
            },
            {
                question: "Which attribute is used to define the background color of an HTML page?",
                options: ["bgcolor", "background", "color", "background-color"],
                correctAnswer: 0,
            },
            {
                question: "Which tag is used for the largest heading in HTML?",
                options: ["<h1>", "<h2>", "<h3>", "<h4>"],
                correctAnswer: 0,
            },
            {
                question: "Which tag is used to define an unordered list in HTML?",
                options: ["<ul>", "<ol>", "<li>", "<list>"],
                correctAnswer: 0,
            },
            {
                question: "How do you define a form in HTML?",
                options: ["<form>", "<input>", "<submit>", "<button>"],
                correctAnswer: 0,
            },
            {
                question: "Which HTML element is used to define a line break?",
                options: ["<br>", "<hr>", "<break>", "<line>"],
                correctAnswer: 0,
            },
        ],
    },
    {
        title: "React Quiz",
        questions: [
            {
                question: "What is the default state of a React component?",
                options: ["null", "undefined", "true", "false"],
                correctAnswer: 0,
            },
            {
                question: "Which method is used to render a React component?",
                options: ["renderComponent()", "render()", "display()", "componentRender()"],
                correctAnswer: 1,
            },
            {
                question: "How do you pass data to a component in React?",
                options: ["using props", "using state", "using componentDidMount", "using useEffect"],
                correctAnswer: 0,
            },
            {
                question: "What is the purpose of the `useEffect` hook in React?",
                options: ["Handling side effects", "Managing state", "Rendering components", "Routing"],
                correctAnswer: 0,
            },
            {
                question: "Which of the following is used to manage state in a React functional component?",
                options: ["useState", "setState", "state", "context"],
                correctAnswer: 0,
            },
            {
                question: "What is JSX in React?",
                options: ["A JavaScript function", "JavaScript XML", "JavaScript X", "A type of state"],
                correctAnswer: 1,
            },
            {
                question: "Which method is called before a React component is removed from the DOM?",
                options: ["componentWillUnmount", "componentDidMount", "componentWillMount", "render"],
                correctAnswer: 0,
            },
            {
                question: "What is the purpose of keys in React lists?",
                options: ["To uniquely identify elements", "To set CSS styles", "To define event handlers", "To store data"],
                correctAnswer: 0,
            },
            {
                question: "What is the purpose of the `ReactDOM.render()` function?",
                options: ["To render JSX", "To render React components", "To mount React components", "To initialize React"],
                correctAnswer: 1,
            },
            {
                question: "How do you update the state in React?",
                options: ["setState()", "updateState()", "this.state = newValue", "useState()"],
                correctAnswer: 0,
            },
        ],
    },
];
