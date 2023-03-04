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
                          <button onclick="loadAiDetails('${tool.id}')" id="btn-detail" class="border-danger rounded-circle bg-danger" data-bs-toggle="modal" data-bs-target="#detailModal" style="--bs-bg-opacity: .4"><i class="fa-solid  fa-arrow-right " style="color: crimson;"></i></button>
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

const loadAiDetails = async id =>{
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    const res = await fetch (url);
    const data = await res.json();
    displayAiDetails(data.data);
}

const displayAiDetails = tool =>{
    document.getElementById('ai-description').innerText = tool.description ? tool.description : 'no data found';
    document.getElementById('basic-price').innerText = tool.pricing[0].price ? tool.pricing[0].price : 'free of cost';
    document.getElementById('pro-price').innerText = tool.pricing[1].price ? tool.pricing[1].price : 'free of cost';
    document.getElementById('enterprise-price-detail').innerText = tool.pricing[2].plan ? tool.pricing[2].plan : 'free of cost';
    document.getElementById('feature-1').innerText = tool.features[1].feature_name
    document.getElementById('feature-2').innerText = tool.features[2].feature_name
    document.getElementById('feature-3').innerText = tool.features[3].feature_name
    document.getElementById('Integration-1').innerText = tool.integrations[0] ? tool.integrations[0] : 'no data found'
    document.getElementById('Integration-2').innerText = tool.integrations[1] ? tool.integrations[1] : 'no data found'
    document.getElementById('Integration-3').innerText = tool.integrations[2] ? tool.integrations[2] : 'no data found'
    document.getElementById('image-card').innerHTML = `
    <img src="${tool.image_link[0]}" class="card-img-top" alt="...">
    <h5 class="mt-4 text-center">${tool.input_output_examples[0].input}</h5>
    <p class="text-center">${tool.input_output_examples[1].input}</p>`
}

loadAiTools(6);