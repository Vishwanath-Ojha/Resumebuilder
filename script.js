document.addEventListener('DOMContentLoaded', function() {
    // Helper function to format text with bullets (moved to top)
    function formatTextWithBullets(text) {
        if (!text) return '';
        // Convert newlines to <br> tags
        let formattedText = text.replace(/\n/g, '<br>');
        // Convert lines starting with - or * to bullet points
        formattedText = formattedText.replace(/(^|<br>)([-*]\s*)(.+?)(?=<br>|$)/g, '$1• $3');
        return formattedText;
    }

    // Initialize the form with one entry for each section
    function initializeForm() {
        // Add one empty entry for each section if none exist
        if (!document.querySelector('.experience-entry')) {
            addExperienceEntry();
        }
        if (!document.querySelector('.education-entry')) {
            addEducationEntry();
        }
        if (!document.querySelector('.skill-entry')) {
            addSkillEntry();
        }
    }

    // Add a new experience entry
    function addExperienceEntry() {
        const experienceFields = document.getElementById('experienceFields');
        if (!experienceFields) {
            console.error('Experience fields container not found');
            return;
        }

        const newExperience = document.createElement('div');
        newExperience.className = 'experience-entry';
        newExperience.innerHTML = `
            <input type="text" class="exp-job-title" placeholder="Job Title">
            <input type="text" class="exp-company" placeholder="Company">
            <div class="form-row">
                <input type="text" class="exp-start" placeholder="Start Date (e.g., 2020)">
                <input type="text" class="exp-end" placeholder="End Date (e.g., 2022 or Present)">
            </div>
            <textarea class="exp-description" placeholder="Job Description (bullet points work well)"></textarea>
            <button type="button" class="remove-btn">Remove</button>
        `;
        experienceFields.appendChild(newExperience);
        
        // Add event listener to the new remove button
        const removeBtn = newExperience.querySelector('.remove-btn');
        if (removeBtn) {
            removeBtn.addEventListener('click', function() {
                const entries = document.querySelectorAll('.experience-entry');
                if (entries.length > 1) {
                    experienceFields.removeChild(newExperience);
                } else {
                    alert("You need to have at least one experience entry.");
                }
            });
        }
    }
    
    // Add a new education entry
    function addEducationEntry() {
        const educationFields = document.getElementById('educationFields');
        if (!educationFields) {
            console.error('Education fields container not found');
            return;
        }

        const newEducation = document.createElement('div');
        newEducation.className = 'education-entry';
        newEducation.innerHTML = `
            <input type="text" class="edu-degree" placeholder="Degree (e.g., Bachelor of Science)">
            <input type="text" class="edu-school" placeholder="School/University">
            <div class="form-row">
                <input type="text" class="edu-start" placeholder="Start Date (e.g., 2016)">
                <input type="text" class="edu-end" placeholder="End Date (e.g., 2020)">
            </div>
            <button type="button" class="remove-btn">Remove</button>
        `;
        educationFields.appendChild(newEducation);
        
        // Add event listener to the new remove button
        const removeBtn = newEducation.querySelector('.remove-btn');
        if (removeBtn) {
            removeBtn.addEventListener('click', function() {
                const entries = document.querySelectorAll('.education-entry');
                if (entries.length > 1) {
                    educationFields.removeChild(newEducation);
                } else {
                    alert("You need to have at least one education entry.");
                }
            });
        }
    }
    
    // Add a new skill entry
    function addSkillEntry() {
        const skillsFields = document.getElementById('skillsFields');
        if (!skillsFields) {
            console.error('Skills fields container not found');
            return;
        }

        const newSkill = document.createElement('div');
        newSkill.className = 'skill-entry';
        newSkill.innerHTML = `
            <input type="text" class="skill-name" placeholder="Skill (e.g., JavaScript)">
            <select class="skill-level">
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
                <option value="expert">Expert</option>
            </select>
            <button type="button" class="remove-btn">Remove</button>
        `;
        skillsFields.appendChild(newSkill);
        
        // Add event listener to the new remove button
        const removeBtn = newSkill.querySelector('.remove-btn');
        if (removeBtn) {
            removeBtn.addEventListener('click', function() {
                const entries = document.querySelectorAll('.skill-entry');
                if (entries.length > 1) {
                    skillsFields.removeChild(newSkill);
                } else {
                    alert("You need to have at least one skill entry.");
                }
            });
        }
    }
    
    // Reset the entire form
    function resetForm() {
        // Clear all form inputs
        const form = document.getElementById('resumeForm');
        if (form) form.reset();
        
        // Clear all dynamic fields
        const experienceFields = document.getElementById('experienceFields');
        const educationFields = document.getElementById('educationFields');
        const skillsFields = document.getElementById('skillsFields');
        
        if (experienceFields) experienceFields.innerHTML = '';
        if (educationFields) educationFields.innerHTML = '';
        if (skillsFields) skillsFields.innerHTML = '';
        
        // Add one empty entry for each section
        addExperienceEntry();
        addEducationEntry();
        addSkillEntry();
        
        // Reset preview
        const preview = document.querySelector('.resume-template');
        if (preview) {
            preview.innerHTML = '<p>Fill out the form to see your resume preview</p>';
        }
    }
    
    // Generate the resume preview
    function generateResume() {
        // Get form values with null checks
        const fullNameElement = document.getElementById('fullName');
        const fullName = fullNameElement ? fullNameElement.value : '';
        
        const jobTitleElement = document.getElementById('jobTitle');
        const jobTitle = jobTitleElement ? jobTitleElement.value : '';
        
        const emailElement = document.getElementById('email');
        const email = emailElement ? emailElement.value : '';
        
        const phoneElement = document.getElementById('phone');
        const phone = phoneElement ? phoneElement.value : '';
        
        const addressElement = document.getElementById('address');
        const address = addressElement ? addressElement.value : '';
        
        const linkedinElement = document.getElementById('linkedin');
        const linkedin = linkedinElement ? linkedinElement.value : '';
        
        const summaryElement = document.getElementById('summary');
        const summary = summaryElement ? summaryElement.value : '';
        
        // Get experiences
        const experiences = [];
        document.querySelectorAll('.experience-entry').forEach(entry => {
            const jobTitleElement = entry.querySelector('.exp-job-title');
            const companyElement = entry.querySelector('.exp-company');
            const startDateElement = entry.querySelector('.exp-start');
            const endDateElement = entry.querySelector('.exp-end');
            const descriptionElement = entry.querySelector('.exp-description');
            
            experiences.push({
                jobTitle: jobTitleElement ? jobTitleElement.value : '',
                company: companyElement ? companyElement.value : '',
                startDate: startDateElement ? startDateElement.value : '',
                endDate: endDateElement ? endDateElement.value : '',
                description: descriptionElement ? descriptionElement.value : ''
            });
        });
        
        // Get education
        const education = [];
        document.querySelectorAll('.education-entry').forEach(entry => {
            const degreeElement = entry.querySelector('.edu-degree');
            const schoolElement = entry.querySelector('.edu-school');
            const startDateElement = entry.querySelector('.edu-start');
            const endDateElement = entry.querySelector('.edu-end');
            
            education.push({
                degree: degreeElement ? degreeElement.value : '',
                school: schoolElement ? schoolElement.value : '',
                startDate: startDateElement ? startDateElement.value : '',
                endDate: endDateElement ? endDateElement.value : ''
            });
        });
        
        // Get skills
        const skills = [];
        document.querySelectorAll('.skill-entry').forEach(entry => {
            const nameElement = entry.querySelector('.skill-name');
            const levelElement = entry.querySelector('.skill-level');
            
            skills.push({
                name: nameElement ? nameElement.value : '',
                level: levelElement ? levelElement.value : 'beginner'
            });
        });
        
        // Generate HTML for the resume
        let resumeHTML = `
            <div class="resume-header">
                <h1>${fullName || 'Your Name'}</h1>
                ${jobTitle ? `<div class="job-title">${jobTitle}</div>` : ''}
                <div class="contact-info">
                    ${email ? `<div><i class="fas fa-envelope"></i> ${email}</div>` : ''}
                    ${phone ? `<div><i class="fas fa-phone"></i> ${phone}</div>` : ''}
                    ${address ? `<div><i class="fas fa-map-marker-alt"></i> ${address}</div>` : ''}
                    ${linkedin ? `<div><i class="fab fa-linkedin"></i> ${linkedin}</div>` : ''}
                </div>
            </div>
        `;
        
        // Add summary if exists
        if (summary) {
            resumeHTML += `
                <div class="section">
                    <div class="section-title"><i class="fas fa-user"></i> Summary</div>
                    <p>${formatTextWithBullets(summary)}</p>
                </div>
            `;
        }
        
        // Add experiences if exists
        const hasExperiences = experiences.some(exp => exp.jobTitle || exp.company);
        if (hasExperiences) {
            resumeHTML += `
                <div class="section">
                    <div class="section-title"><i class="fas fa-briefcase"></i> Work Experience</div>
            `;
            
            experiences.forEach(exp => {
                if (exp.jobTitle || exp.company) {
                    resumeHTML += `
                        <div class="experience-item">
                            <div class="item-header">
                                ${exp.jobTitle ? `<div class="item-title">${exp.jobTitle}</div>` : ''}
                                ${(exp.startDate || exp.endDate) ? 
                                    `<div class="item-date">${exp.startDate || ''} - ${exp.endDate || ''}</div>` : ''}
                            </div>
                            ${exp.company ? `<div class="item-subtitle">${exp.company}</div>` : ''}
                            ${exp.description ? `<p>${formatTextWithBullets(exp.description)}</p>` : ''}
                        </div>
                    `;
                }
            });
            
            resumeHTML += `</div>`;
        }
        
        // Add education if exists
        const hasEducation = education.some(edu => edu.degree || edu.school);
        if (hasEducation) {
            resumeHTML += `
                <div class="section">
                    <div class="section-title"><i class="fas fa-graduation-cap"></i> Education</div>
            `;
            
            education.forEach(edu => {
                if (edu.degree || edu.school) {
                    resumeHTML += `
                        <div class="education-item">
                            <div class="item-header">
                                ${edu.degree ? `<div class="item-title">${edu.degree}</div>` : ''}
                                ${(edu.startDate || edu.endDate) ? 
                                    `<div class="item-date">${edu.startDate || ''} - ${edu.endDate || ''}</div>` : ''}
                            </div>
                            ${edu.school ? `<div class="item-subtitle">${edu.school}</div>` : ''}
                        </div>
                    `;
                }
            });
            
            resumeHTML += `</div>`;
        }
        
        // Add skills if exists
        const hasSkills = skills.some(skill => skill.name);
        if (hasSkills) {
            resumeHTML += `
                <div class="section">
                    <div class="section-title"><i class="fas fa-tools"></i> Skills</div>
                    <div class="skills-list">
            `;
            
            skills.forEach(skill => {
                if (skill.name) {
                    resumeHTML += `
                        <div class="skill-tag">${skill.name}${skill.level !== 'beginner' ? ` (${skill.level})` : ''}</div>
                    `;
                }
            });
            
            resumeHTML += `
                    </div>
                </div>
            `;
        }
        
        // Update the preview
        const preview = document.querySelector('.resume-template');
        if (preview) {
            preview.innerHTML = resumeHTML || '<p>Fill out the form to see your resume preview</p>';
        }
    }

    // Initialize the form
    initializeForm();

    // Set up event listeners
    const addExperienceBtn = document.getElementById('addExperience');
    if (addExperienceBtn) {
        addExperienceBtn.addEventListener('click', addExperienceEntry);
    }
    
    const addEducationBtn = document.getElementById('addEducation');
    if (addEducationBtn) {
        addEducationBtn.addEventListener('click', addEducationEntry);
    }
    
    const addSkillBtn = document.getElementById('addSkill');
    if (addSkillBtn) {
        addSkillBtn.addEventListener('click', addSkillEntry);
    }
    
    const generateBtn = document.getElementById('generateResume');
    if (generateBtn) {
        generateBtn.addEventListener('click', generateResume);
    }
    
    const resetBtn = document.getElementById('resetForm');
    if (resetBtn) {
        resetBtn.addEventListener('click', resetForm);
    }
    
    const downloadBtn = document.getElementById('downloadResume');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            alert('In a complete implementation, this would download the resume as PDF using a library like html2pdf.js.');
        });
    }
});