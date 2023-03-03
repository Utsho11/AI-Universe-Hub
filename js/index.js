const loadAiTools = async(limit) =>{
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    const res = await fetch(url);
    const data = await res.json();
    displayAiTools(data.data.tools,limit);
}

const displayAiTools = (tools,limit) =>{
    const AiToolContainer = document.getElementById('AiTool-container');
    AiToolContainer.innerText = " ";
    const showMore =  document.getElementById('show-more'); 
    if(limit && tools.length > 6){
        tools = tools.slice(0,6);
       showMore.classList.remove('d-none');
    }
    else{
        showMore.classList.add('d-none');  
    }
    tools.forEach(tool => {
        const toolDiv = document.createElement('div');
        toolDiv.classList.add('col');
        toolDiv.innerHTML =`
        <div class="card h-100">
                        <img style="height: 180px;" src="${tool.image}" class="card-img-top" alt="...">
                        <div class="card-body">
                          <h5>Feature</h5>
                          <ol>
                          <li>${tool.features[0] ? tool.features[0] : "not data"}</li>
                          <li>${tool.features[1] ? tool.features[1] : "not data"}</li>
                          <li>${tool.features[2] ? tool.features[2] : "not data"}</li>
                          <li>${tool.features[3] ? tool.features[3] : "not data"}</li>
                          </ol>
                        </div>
                        <div class="card-footer">
                          
                          <h5 class="card-title">${tool.name}</h5>
                          <div class="d-flex">
                          <i class="flex-grow-1 fa-solid fa-calendar-days" style="font-size: smaller;"><span> ${tool.published_in}</span></i>
                          <button class="border-danger rounded-circle bg-danger" style="--bs-bg-opacity: .4"><i class="fa-solid  fa-arrow-right " style="color: crimson;"></i></button>
                          </div>
                          
                        </div>
                      </div>`;
        AiToolContainer.appendChild(toolDiv);
          });
    toggleSpinner(false);
}

document.getElementById('btn-show-more').addEventListener('click',function(){
    toggleSpinner(true);
    loadAiTools();
})

const toggleSpinner = isLoading =>{
    const spinSection = document.getElementById('spinner');
    if(isLoading){
        spinSection.classList.remove('d-none');
    }
    else{
        spinSection.classList.add('d-none');
    }
}


loadAiTools(7);