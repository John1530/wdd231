const courses = [
    {
        code: "CSE 110",
        subject: "CSE",
        credits: 2,
        certificate: "Web and Computer Programming",
        description: "This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, arrays, and input/output) and use them to solve problems.",
        technology: ["Python"],
        completed: true
    },
    {
        code: "CSE 111",
        subject: "CSE",
        credits: 2,
        certificate: "Web and Computer Programming",
        description: "CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call, debug, and test their own functions; and to handle errors within functions. Students write programs with functions to solve problems in many disciplines.",
        technology: ["Python"],
        completed: true
    },
    {
        code: "CSE 210",
        subject: "CSE",
        credits: 2,
        certificate: "Web and Computer Programming",
        description: "This course introduces the notion of classes and objects. It presents encapsulation at a conceptual level and works with inheritance and polymorphism.",
        technology: ["C#"],
        completed: true
    },
    {
        code: "WDD 130",
        subject: "WDD",
        credits: 2,
        certificate: "Web and Computer Programming",
        description: "This course introduces students to the World Wide Web and careers in website design and development. Students gain hands-on experience creating websites using HTML and CSS.",
        technology: ["HTML", "CSS"],
        completed: true
    },
    {
        code: "WDD 131",
        subject: "WDD",
        credits: 2,
        certificate: "Web and Computer Programming",
        description: "This course builds on Web Fundamentals and introduces JavaScript to create dynamic websites that respond to user interaction.",
        technology: ["HTML", "CSS", "JavaScript"],
        completed: true
    },
    {
        code: "WDD 231",
        subject: "WDD",
        credits: 2,
        certificate: "Web and Computer Programming",
        description: "This course builds on Dynamic Web Fundamentals and focuses on user experience, accessibility, performance optimization, compliance, and API usage.",
        technology: ["HTML", "CSS", "JavaScript"],
        completed: false
    }
];

const container = document.querySelector("#course-container");
const totalCredits = document.querySelector("#credit-total");

function displayCourses(courseList) {

    container.innerHTML = "";

    let credits = 0;

    courseList.forEach(course => {

        const card = document.createElement("article");
        card.classList.add("course-card");

        if (course.completed) {
            card.classList.add("completed");
        }

        card.innerHTML = `
            <h3>${course.code}</h3>

            <p class="certificate">${course.certificate}</p>

            <p><strong>Credits:</strong> ${course.credits}</p>

            <p><strong>Technology:</strong> ${course.technology.join(" • ")}</p>

            <p><strong>Status:</strong> ${
                course.completed ? "✅ Completed" : "⏳ In Progress"
            }</p>

            <p class="description">${course.description}</p>
        `;

        container.appendChild(card);

        credits += course.credits;
    });

    totalCredits.textContent = credits;
}

/* Display all courses when the page loads */
displayCourses(courses);

/* Filter Buttons */

document.querySelector("#all").addEventListener("click", () => {
    displayCourses(courses);
});

document.querySelector("#wdd").addEventListener("click", () => {
    displayCourses(
        courses.filter(course => course.subject === "WDD")
    );
});

document.querySelector("#cse").addEventListener("click", () => {
    displayCourses(
        courses.filter(course => course.subject === "CSE")
    );
});