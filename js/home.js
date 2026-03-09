// {
//       "id": 1,
//       "title": "Fix navigation menu on mobile devices",
//       "description": "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.",
//       "status": "open",
//       "labels": [
//         "bug",
//         "help wanted"
//       ],
//       "priority": "high",
//       "author": "john_doe",
//       "assignee": "jane_smith",
//       "createdAt": "2024-01-15T10:30:00Z",
//       "
// }

const resetButtons = () => {
    const all = document.getElementById("home-all");
    const open = document.getElementById("home-open");
    const closed = document.getElementById("home-closed");
    
    all.classList.remove("btn-primary");
    open.classList.remove("btn-primary");
    closed.classList.remove("btn-primary");
    
    all.classList.add("bg-white", "text-gray-600", "outline-gray-600");
    open.classList.add("bg-white", "text-gray-600", "outline-gray-600");
    closed.classList.add("bg-white", "text-gray-600", "outline-gray-600");
};

const setButton = (btnId) => {
    resetButtons();

    document.getElementById(btnId).classList.remove("bg-white", "text-gray-600", "outline-gray-600");
    document.getElementById(btnId).classList.add("btn-primary");

    if (btnId === "home-open") {
        filterStatus("open");
    } else if (btnId === "home-closed") {
        filterStatus("closed")
    } else {
        filterStatus("all");
    }
};

const filterStatus = async (status) => {
    if (status === "all") {
        loadAllIssues();
        return;
    }

    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const json = await res.json();
    const allData = json.data;

    const returnData = allData.filter(data => data.status === status);

    displayIssues(returnData);
};

const loadAllIssues = () => {
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues").then(res => res.json()).then(json => displayIssues(json.data));
};

const displayIssueDetails = async (id) => {
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
    const res = await fetch(url);
    const details = await res.json();
    const data = details.data;
    // console.log(data);
    
    const container = document.getElementById("modal-container");
    container.innerHTML = `
        <div class="p-4 rounded-md space-y-4">
        <div class="space-y-2">
            <h1 class="text-3xl font-bold">${data.title}</h1>

            <div class="flex gap-2 items-center">
                ${data.status === "open" ? `<p class="bg-green-400 text-white text-[12px] font-semibold px-1 rounded-full w-16 text-center">OPEN</p>` : `<p class="bg-red-400 text-white text-[12px] font-semibold px-1 rounded-full w-16 text-center">CLOSED</p>`}</p>
                <div class="bg-gray-400 h-1 w-1 rounded-full"></div>
                <p class="text-gray-400">Opened by ${data.author}</p>
                <div class="bg-gray-400 h-1 w-1 rounded-full"></div>
                <p class="text-gray-400">
                    ${data.createdAt[5]}${data.createdAt[6]}/${data.createdAt[8]}${data.createdAt[9]}/${data.createdAt[0]}${data.createdAt[1]}${data.createdAt[2]}${data.createdAt[3]}
                </p>
            </div>
        </div>

        <div class="flex flex-wrap gap-1 text-[12px] font-semibold">
            ${data.labels.length === 2 ? `<h2 class="bg-red-100 px-1 py-1 rounded-full text-red-600"><span><i
                        class="fa-solid fa-bug"></i></span> ${data.labels[0]}</h2>
            <h2 class="bg-yellow-100 px-1 py-1 rounded-full text-yellow-600"><span><i
                        class="fa-regular fa-life-ring"></i></span> ${data.labels[1]}</h2>` : `<h2
                class="bg-green-100 px-1 py-1 rounded-full text-green-600"><span><i class="fa-solid fa-bug"></i></span>
                ${data.labels[0]}</h2>`}
        </div>

        <div>
            <p class="text-gray-400">${data.description}</p>
        </div>

        <div class="bg-gray-100 rounded-xl w-full p-4 flex gap-2.5">
            <div class="w-full">
                <p class="text-gray-400">Assignee:</p>
                <p>${data.assignee === "" ? `Not Assigned Yet` : data.assignee}</p>
            </div>
            <div class="w-full">
                <p class="text-gray-400">Priority:</p>
                ${data.priority === "high" ? `<h2 class="bg-red-400 rounded-full w-20 text-center text-xs font-semibold p-1 text-white">HIGH</h2>` : data.priority === "medium" ? `<h2 class="bg-yellow-400 rounded-full w-20 text-center text-xs font-semibold p-1 text-white">MEDIUM</h2>` : `<h2 class="bg-gray-400 rounded-full w-20 text-center text-xs font-semibold p-1 text-white">LOW</h2>`}
            </div>
        </div>
    </div>
    `;

    document.getElementById("issue_modal").showModal();
};

const displayIssues = (issues) => {
    // get container
    const container = document.getElementById("card-container");
    container.innerHTML = "";
    
    // set total count
    document.getElementById("total-issues").innerText = issues.length;
    
    if (issues.length === 0) {
        container.innerHTML = `
                    <div id="no-issues" class="col-span-full">
                        <h1 class="text-center text-4xl text-gray-600">No Issues Found</h1>
                    </div>
        `
        return;
    }

    // create each card
    issues.forEach(issue => {
        const card = document.createElement("div");
        card.innerHTML = `
            <div onclick="displayIssueDetails(${issue.id})" id="card-${issue.id}" class="${issue.status === "open" ? `border-t-3 border-t-green-600` : `border-t-3 border-t-purple-600`} h-full flex flex-col justify-center bg-white shadow-md rounded-lg p-4 space-y-4">
                <div class="flex justify-between items-center">
                    ${issue.status === "open" ? `<img src="./assets/Open-Status.png" class="" alt="">` : `<img src="./assets/Closed- Status .png" class="" alt="">`}
                    ${issue.priority === "high" ? `<h2 class="bg-red-100 rounded-full w-20 text-center text-xs font-semibold p-1 text-red-600">HIGH</h2>` : issue.priority === "medium" ? `<h2 class="bg-yellow-100 rounded-full w-20 text-center text-xs font-semibold p-1 text-yellow-600">MEDIUM</h2>` : `<h2 class="bg-[#EEEFF2] rounded-full w-20 text-center text-xs font-semibold p-1 text-gray-600">LOW</h2>`}
                    
                </div>

                <h1 class="text-lg font-semibold leading-5">${issue.title}</h1>
                <p class="text-[#64748B] text-xs leading-4">${issue.description}</p>

                <div id="label-container" class="flex flex-wrap gap-1 text-[12px] font-semibold">
                ${issue.labels.length === 2 ? `<h2 class="bg-red-100 px-1 py-1 rounded-full text-red-600"><span><i class="fa-solid fa-bug"></i></span> ${issue.labels[0]}</h2>
                    <h2 class="bg-yellow-100 px-1 py-1 rounded-full text-yellow-600"><span><i class="fa-regular fa-life-ring"></i></span> ${issue.labels[1]}</h2>` : `<h2 class="bg-green-100 px-1 py-1 rounded-full text-green-600"><span><i class="fa-solid fa-bug"></i></span> ${issue.labels[0]}</h2>`}
                </div>

                <span class="w-full text-[#cecece]">
                    <hr>
                </span>

                <div class="text-[#64748B] text-sm py-2">
                    <p>By ${issue.author}</p>
                    <p>${issue.createdAt[5]}${issue.createdAt[6]}/${issue.createdAt[8]}${issue.createdAt[9]}/${issue.createdAt[0]}${issue.createdAt[1]}${issue.createdAt[2]}${issue.createdAt[3]}</p>
                </div>
            </div>
        `

        // append
        container.append(card);
    });
};

// search function event
document.getElementById("btn-search").addEventListener("click", () => {
    resetButtons();
    const input = document.getElementById("input-search");
    const inputValue = input.value.trim().toLowerCase();
    // console.log(inputValue);
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${inputValue}`;
    fetch(url).then(res => res.json()).then(data => displayIssues(data.data));
    input.value = "";
});

loadAllIssues();