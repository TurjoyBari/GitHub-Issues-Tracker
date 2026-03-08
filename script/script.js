let allIssues = [];

const allToggleBtn = document.getElementById("all-toggle-btn");
const openToggleBtn = document.getElementById("open-toggle-btn");
const closedToggleBtn = document.getElementById("closed-toggle-btn");

function toggleStyle(id) {
  allToggleBtn.classList.remove("bg-[#4A00FF]", "text-white");
  openToggleBtn.classList.remove("bg-[#4A00FF]", "text-white");
  closedToggleBtn.classList.remove("bg-[#4A00FF]", "text-white");

  allToggleBtn.classList.add("bg-[#FFFFFF]", "text-[#64748B]");
  openToggleBtn.classList.add("bg-[#FFFFFF]", "text-[#64748B]");
  closedToggleBtn.classList.add("bg-[#FFFFFF]", "text-[#64748B]");

  const selected = document.getElementById(id);
  console.log(selected);

  selected.classList.remove("bg-[#FFFFFF]", "text-[#64748B]");
  selected.classList.add("bg-[#4A00FF]", "text-white");
}

const loadCardDetail = async (id) => {
  const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
  const res = await fetch(url);
  const details = await res.json();
  displayCardDetail(details.data);
};
const displayCardDetail = (issue) => {
  console.log(issue);
  const detailsBox = document.getElementById("details-container");

  function getLabelBadge(label) {
    if (!label) {
      return "";
    }
    if (label === "open") {
      return `
       <div class="badge badge-success text-[12px] text-white rounded-full">Opened</div>
       `;
    }
    if (label === "closed") {
      return `
       <div class="badge badge-error text-[12px] text-white rounded-full">closed</div>
       `;
    }

    if (label === "high") {
      return `
       <div class="badge badge-error text-[12px] text-white rounded-full uppercase">High</div>
       `;
    }
    if (label === "medium") {
      return `
       <div class="badge badge-warning text-[12px] text-white rounded-full uppercase">medium</div>
       `;
    }
    if (label === "low") {
      return `
       <div class="badge badge-neutral text-[12px] bg-gray-300 border-none text-black rounded-full uppercase">low</div>
       `;
    }

    if (label === "bug") {
      return `
       <div class="badge badge-soft badge-error uppercase">
           <img src="./assets/Vector.png" alt="">
           bug
       </div>
       `;
    }

    if (label === "help wanted") {
      return `
       <div class="badge badge-soft badge-warning uppercase">
           <img src="./assets/Lifebuoy.png" alt="">
           help wanted
       </div>
       `;
    }

    if (label === "enhancement") {
      return `
       <div class="badge badge-soft badge-success uppercase">
           <img src="./assets/Lifebuoy.png" alt="">
           enhancement
       </div>
       `;
    }

    if (label === "documentation") {
      return `
       <div class="badge badge-soft badge-success uppercase">
           <img src="./assets/Lifebuoy.png" alt="">
           documentation
       </div>
       `;
    }

    if (label === "good first issue") {
      return `
       <div class="badge badge-soft badge-success uppercase">
           <img src="./assets/Lifebuoy.png" alt="">
           good first issue
       </div>
       `;
    }

    return "";
  }

  detailsBox.innerHTML = `
    
            <div>
                <h1 class="font-bold text-[24px] text-[#1F2937]">${issue.title}</h1>
                <div class="flex gap-5 items-center pt-[8px]">
                    ${getLabelBadge(issue.status)}
                    <ul class="text-[#64748B] text-[12px] list-disc flex gap-5">
                        <li>Opened by ${issue.author}</li>
                        <li>22/02/2026</li>
                    </ul>                    
                </div>
            </div>
            <div>
                <div class="card-actions pt-[12px] flex gap-2 flex-wrap">
                    ${getLabelBadge(issue.labels[0])}
                    ${getLabelBadge(issue.labels[1])}
                </div>
            </div>
            <p class="text-[12px] text-[#64748B] line-clamp-2">
                 ${issue.description}
            </p>
            <div class="flex justify-between bg-gray-100 p-4">
                <div>
                    <p class="text-[#64748B] text-[16px]">Assignee:</p>
                    <h2 class="font-semibold text-[16px] text-[#1F2937]"> ${issue.assignee}</h2>
                </div>
                <div>
                    <p class="text-[#64748B] text-[16px]">Priority:</p>
                    ${getLabelBadge(issue.priority)}
                </div>
            </div>
    
    
    
    `;
  document.getElementById("issue_modal").showModal();
};

const loadIssues = () => {
  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((response) => response.json())
    .then((data) => {
      allIssues = data.data;
      displayIssues(allIssues);
    });

  const displayIssues = (issues) => {
    console.log(issues);
    const issueCount = document.getElementById("issueCount");
    issueCount.innerText = issues.length;

    const cardContainer = document.getElementById("cardContainer");
    cardContainer.innerHTML = "";

    issues.forEach((issue) => {
      const btnDiv = document.createElement("div");

      let priorityBadge = "";

      if (issue.priority === "high") {
        priorityBadge = `<div class="badge badge-soft badge-error font-bold">High</div>`;
      } else if (issue.priority === "medium") {
        priorityBadge = `<div class="badge badge-soft badge-warning font-bold">Medium</div>`;
      } else {
        priorityBadge = `<div class="badge badge-neutral text-[12px] bg-gray-300 border-none text-black font-bold uppercase">low</div>`;
      }

      function getLabelBadge(label) {
        if (!label) {
          return "";
        }

        if (label === "bug") {
          return `
       <div class="badge badge-soft badge-error uppercase">
           <img src="./assets/Vector.png" alt="">
           bug
       </div>
       `;
        }

        if (label === "help wanted") {
          return `
       <div class="badge badge-soft badge-warning uppercase">
           <img src="./assets/Lifebuoy.png" alt="">
           help wanted
       </div>
       `;
        }

        if (label === "enhancement") {
          return `
       <div class="badge badge-soft badge-success uppercase">
           <img src="./assets/Lifebuoy.png" alt="">
           enhancement
       </div>
       `;
        }

        if (label === "documentation") {
          return `
       <div class="badge badge-soft badge-success uppercase">
           <img src="./assets/Lifebuoy.png" alt="">
           documentation
       </div>
       `;
        }

        if (label === "good first issue") {
          return `
       <div class="badge badge-soft badge-success uppercase">
           <img src="./assets/Lifebuoy.png" alt="">
           good first issue
       </div>
       `;
        }

        return "";
      }

      let statusImg = "";
      let borderColor = "";

      if (issue.status === "open") {
        statusImg = "./assets/Open-Status.png";
        borderColor = "#00A96E";
      } else {
        statusImg = "./assets/Closed-Status .png";
        borderColor = "#A855F7";
      }

      btnDiv.innerHTML = `

        <div class="card  p-4 h-full bg-base-100 w-full shadow-sm border-t-4" onclick="loadCardDetail(${issue.id})"
             style="border-top-color:${borderColor} ">

            <div class="h-60 w-full">

                <div class="flex justify-between pb-[12px]">
                    <img src="${statusImg}" alt="">
                    ${priorityBadge}
                </div>

                <div class="pb-[8px]">
                    <h2 class="text-[18px] font-bold text-[#000000] p-[8px]">${issue.title}</h2>

                    <p class="text-[12px] text-[#64748B] line-clamp-2">
                    ${issue.description}
                    </p>

                    <div class="card-actions pt-[12px] flex gap-2 flex-wrap">
                       ${getLabelBadge(issue.labels[0])}
                       ${getLabelBadge(issue.labels[1])}
                    </div>
                </div>

            </div>

            <hr class="border-1 border-[#E4E4E7] ">

            <div>
                <p class="text-[12px] text-[#64748B] pb-[8px] pt-[8px]">
                    ${issue.assignee}
                </p>

                <p class="text-[12px] text-[#64748B]">
                    ${issue.createdAt}
                </p>
            </div>
            

        </div>
        `;

      cardContainer.appendChild(btnDiv);
    });
  };
};

function displayIssues(issues) {
  const issueCount = document.getElementById("issueCount");
  issueCount.innerText = issues.length;

  const cardContainer = document.getElementById("cardContainer");
  cardContainer.innerHTML = "";

  issues.forEach((issue) => {
    const btnDiv = document.createElement("div");

    let statusImg = "";
    let borderColor = "";

    if (issue.status === "open") {
      statusImg = "./assets/Open-Status.png";
      borderColor = "#00A96E";
    } else {
      statusImg = "./assets/Closed- Status .png";
      borderColor = "#A855F7";
    }

    let priorityBadge = "";

    if (issue.priority === "high") {
      priorityBadge = `<div class="badge badge-soft badge-error font-bold">High</div>`;
    } else if (issue.priority === "medium") {
      priorityBadge = `<div class="badge badge-soft badge-warning font-bold">Medium</div>`;
    } else {
      priorityBadge = `<div class="badge badge-neutral text-[12px] bg-gray-300 border-none text-black font-bold uppercase">low</div>`;
    }

    function getLabelBadge(label) {
      if (!label) {
        return "";
      }

      if (label === "bug") {
        return `
       <div class="badge badge-soft badge-error uppercase">
           <img src="./assets/Vector.png" alt="">
           bug
       </div>
       `;
      }

      if (label === "help wanted") {
        return `
       <div class="badge badge-soft badge-warning uppercase">
           <img src="./assets/Lifebuoy.png" alt="">
           help wanted
       </div>
       `;
      }

      if (label === "enhancement") {
        return `
       <div class="badge badge-soft badge-success uppercase">
           <img src="./assets/Lifebuoy.png" alt="">
           enhancement
       </div>
       `;
      }

      if (label === "documentation") {
        return `
       <div class="badge badge-soft badge-success uppercase">
           <img src="./assets/Lifebuoy.png" alt="">
           documentation
       </div>
       `;
      }

      if (label === "good first issue") {
        return `
       <div class="badge badge-soft badge-success uppercase">
           <img src="./assets/Lifebuoy.png" alt="">
           good first issue
       </div>
       `;
      }

      return "";
    }

    btnDiv.innerHTML = `
    
 
        <div class="card p-4 h-full bg-base-100 w-full shadow-sm border-t-4" onclick="loadCardDetail(${issue.id})"
             style="border-top-color:${borderColor}">

            <div class="h-60 w-full">

                <div class="flex justify-between pb-[12px]">
                    <img src="${statusImg}" alt="">
                    ${priorityBadge}
                </div>

                <div class="pb-[8px]">
                    <h2 class="text-[18px] font-bold text-[#000000] p-[8px]">${issue.title}</h2>

                    <p class="text-[12px] text-[#64748B] line-clamp-2">
                    ${issue.description}
                    </p>

                    <div class="card-actions pt-[12px] flex gap-2 flex-wrap">
                       ${getLabelBadge(issue.labels[0])}
                       ${getLabelBadge(issue.labels[1])}
                    </div>
                </div>

            </div>

            <hr class="border-1 border-[#E4E4E7] ">

            <div>
                <p class="text-[12px] text-[#64748B] pb-[8px] pt-[8px]">
                    ${issue.assignee}
                </p>

                <p class="text-[12px] text-[#64748B]">
                    ${issue.createdAt}
                </p>
            </div>

        </div>

    
    
    `;

    cardContainer.appendChild(btnDiv);
  });
}

function filterIssues(status) {
  const filtered = allIssues.filter((issue) => issue.status === status);

  displayIssues(filtered);
}

loadIssues();
