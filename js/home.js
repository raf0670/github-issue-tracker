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

const loadAllIssues = () => {
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues").then(res => res.json()).then(json => displayIssues(json.data));
};

const displayIssues = (issues) => {
    // get container
    const container = document.getElementById("card-container");
    container.innerHTML = "";

    // create each card
    issues.forEach(issue => {
        const card = document.createElement("div");
        card.innerHTML = `
            <div id="card-${issue.id}" class="max-w-3xs h-80 flex flex-col justify-center bg-white shadow-md rounded-lg p-4 space-y-3.5">
                <div class="flex justify-between items-center">
                    ${issue.status === "open" ? `<img src="./assets/Open-Status.png" class="" alt="">` : `<img src="./assets/Closed- Status .png" class="" alt="">`}
                    ${issue.priority === "high" ? `<h2 class="bg-red-100 rounded-full w-20 text-center text-xs font-semibold p-1 text-red-600">HIGH</h2>` : issue.priority === "medium" ? `<h2 class="bg-yellow-100 rounded-full w-20 text-center text-xs font-semibold p-1 text-yellow-600">MEDIUM</h2>` : `<h2 class="bg-[#EEEFF2] rounded-full w-20 text-center text-xs font-semibold p-1 text-gray-600">LOW</h2>`}
                    
                </div>

                <h1 class="text-lg font-semibold leading-5">${issue.title}</h1>
                <p class="text-[#64748B] text-xs leading-4">${issue.description}</p>

                <div id="label-container" class="flex flex-wrap gap-1 text-[12px] font-semibold">
                ${issue.labels.length === 2 ? `<h2 class="bg-red-100 px-1 py-1 rounded-full"><span><i class="fa-solid fa-bug"></i></span> ${issue.labels[0]}</h2>
                    <h2 class="bg-yellow-100 px-1 py-1 rounded-full"><span><i class="fa-regular fa-life-ring"></i></span> ${issue.labels[1]}</h2>` : `<h2 class="bg-red-100 px-1 py-1 rounded-full"><span><i class="fa-solid fa-bug"></i></span> ${issue.labels[0]}</h2>`}
                </div>

                <span class="w-full text-[#cecece]">
                    <hr>
                </span>

                <div class="text-[#64748B] text-sm py-2">
                    <p>${issue.author}</p>
                    <p>${issue.createdAt}</p>
                </div>
            </div>
        `

        // append
        container.append(card);
    });
};

loadAllIssues();