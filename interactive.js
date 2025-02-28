document.addEventListener('click', function(event) {
    const activeSchematic = document.querySelector('.schematic.active');
    const schematicContent = event.target.closest('.schematic-content');
    
    if (activeSchematic && !schematicContent) {
        hideSchematic(activeSchematic.id);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    changeBackground(0);
    const initialSchematicId = "your-schematic-id"; 
    updateStepDisplay(initialSchematicId);
});

function showSchematic(id) {
    const schematic = document.getElementById(id);
    schematic.style.display = 'flex';
    const firstStep = schematic.querySelector('.step[data-step="1"]');
    firstStep.style.display = 'block';
    updateStepDisplay(id); 
}

function hideSchematic(id) {
    const schematic = document.getElementById(id);
    schematic.style.display = 'none';
    const steps = schematic.querySelectorAll('.step');
    steps.forEach(step => step.style.display = 'none'); 
    const firstStep = schematic.querySelector('.step[data-step="1"]');
    firstStep.style.display = 'block'; 
}

function nextStep(schematicId) {
    const container = document.getElementById(schematicId);
    const currentStep = container.querySelector('.step:not([style*="none"])');
    const nextStep = currentStep.nextElementSibling;
    
    if (nextStep) {
        currentStep.style.display = 'none'; 
        nextStep.style.display = 'block';    
        updateStepDisplay(schematicId);
    }
}

function previousStep(schematicId) {
    const container = document.getElementById(schematicId);
    const currentStep = container.querySelector('.step:not([style*="none"])');
    const prevStep = currentStep.previousElementSibling;
    
    if (prevStep) {
        currentStep.style.display = 'none'; 
        prevStep.style.display = 'block';   
        updateStepDisplay(schematicId);
    }
}

function updateStepDisplay(schematicId) {
    const container = document.getElementById(schematicId);
    const steps = container.querySelectorAll('.step');
    const currentStep = container.querySelector('.step:not([style*="none"])');
    const currentStepNumber = Array.from(steps).indexOf(currentStep) + 1;

    const leftArrow = container.querySelector('.nav-arrow.left');
    const rightArrow = container.querySelector('.nav-arrow.right');


    leftArrow.disabled = currentStepNumber === 1;
    rightArrow.disabled = currentStepNumber === steps.length;


    if (leftArrow.disabled) {
        leftArrow.style.opacity = '0.3';
        leftArrow.style.pointerEvents = 'none'; 
    } else {
        leftArrow.style.opacity = '1';
        leftArrow.style.pointerEvents = 'auto'; 
    }

    if (rightArrow.disabled) {
        rightArrow.style.opacity = '0.3';
        rightArrow.style.pointerEvents = 'none'; 
    } else {
        rightArrow.style.opacity = '1';
        rightArrow.style.pointerEvents = 'auto'; 
    }

    leftArrow.classList.toggle('disabled', leftArrow.disabled);
    rightArrow.classList.toggle('disabled', rightArrow.disabled);


    leftArrow.style.opacity = leftArrow.disabled ? '0.3' : '1';
    rightArrow.style.opacity = rightArrow.disabled ? '0.3' : '1';
}

function changeBackground(index) {
    const backgrounds = document.querySelectorAll('.background');
    const titles = document.querySelectorAll('.background-title');
    backgrounds.forEach((bg, i) => {
        bg.style.opacity = i === index ? 1 : 0;
        bg.style.animation = 'none'; 
        titles[i].style.display = i === index ? 'block' : 'none'; 
    });


    
    document.querySelectorAll('.hotspot, .dark-blue-hotspot').forEach(hotspot => {
        hotspot.classList.toggle('active', hotspot.dataset.bg === index.toString());
    });

    document.querySelectorAll('.hotspot-schematic').forEach(schematic => {
        schematic.style.display = schematic.dataset.bg === index.toString() ? 'block' : 'none';
    });

    
    const sdgContainers = document.querySelectorAll('.sdg-container');
    sdgContainers.forEach(container => {
        container.style.display = container.dataset.bg === index.toString() ? 'block' : 'none';
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const sdgLogos = document.querySelectorAll(".sdg-logo");
    sdgLogos.forEach(logo => {
        logo.addEventListener("click", () => {
            
            logo.style.transform = logo.style.transform === "rotate(360deg)" ? "rotate(0deg)" : "rotate(360deg)";
            
            
            const sdgpopup = logo.closest('.sdg-container').querySelector(".sdg-popup");
            if (sdgpopup.style.display === "block") {
                sdgpopup.style.opacity = "0";
                setTimeout(() => sdgpopup.style.display = "none", 300);
            } else {
                sdgpopup.style.display = "block";
                setTimeout(() => sdgpopup.style.opacity = "1", 10);
            }
        });
    });
});

document.querySelectorAll(".sdg-container").forEach(container => {
    container.addEventListener("click", function() {
        this.classList.toggle("active");
    });
});
