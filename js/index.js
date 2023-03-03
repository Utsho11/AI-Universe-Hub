const loadAiTools = async() =>{
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    const res = await fetch(url);
    const data = await res.json();
    displayAiTools(data.data.tools);
}

const displayAiTools = tools =>{
    const AiToolContainer = document.getElementById('AiTool-container');
    tools.forEach(tool => {
        const toolDiv = document.createElement('div');
        toolDiv.classList.add('col');
        toolDiv.innerHTML =`
        <div class="card h-100">
                        <img src="${tool.image}" class="card-img-top" alt="...">
                        <div class="card-body">
                          <h5>Feature</h5>
                          <p>${tool.features.forEach(element => {
                            
                          })
                          }</p>
                        </div>
                        <div class="card-footer">
                          
                          <h5 class="card-title">${tool.name}</h5>
                          
                          <p class="card-text"></p>
                          
                        </div>
                      </div>`;
        AiToolContainer.appendChild(toolDiv);
    });
}

loadAiTools();