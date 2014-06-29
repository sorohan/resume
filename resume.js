
// Identify headings.
(function() {
    var hNum = [1,2,3,4,5];
    var headings;
    for (var i=0; i<hNum.length; i++) {
        headings = document.body.getElementsByTagName('h' + hNum[i]);
        for (var j=0; j<headings.length; j++) {
            headings[j].setAttribute('className', headings[j].innerHTML.toLowerCase().replace(/[^A-z0-9]/g, ''));
            headings[j].setAttribute('class', headings[j].innerHTML.toLowerCase().replace(/[^A-z0-9]/g, ''));
        }
    }
})();

// Group contact details.
(function() {
    var group = document.createElement('div');
    group.setAttribute('className', 'contact-details');
    group.setAttribute('class', 'contact-details');

    var contactEles = [];
    var allEles = document.body.getElementsByTagName('*');
    var header = allEles[0];
    var i = 0;
    do {
        if (allEles[i].tagName.toLowerCase() === 'p') {
            contactEles.push(allEles[i]);
        }
        i++;
    } while (allEles[i] && allEles[i].tagName.toLowerCase() !== 'blockquote');

    var blockquote;
    if (allEles[i].tagName.toLowerCase() === 'blockquote') {
        blockquote = allEles[i];
    }

    if (blockquote) {
        for (i=0; i<contactEles.length; i++) {
            group.appendChild(contactEles[i]);
        }
        document.body.insertBefore(group, blockquote);
    }
})();

// Group experience.
(function() {
    var experienceH1 = document.getElementsByTagName('h1')[1];
    // Get experience h2s.
    var allEles = document.body.getElementsByTagName('*');
    var experienceH2s = [];
    var passedExperienceH1 = false;
    var groups = [];
    var groupIndex = null;

    for (i=0; i<allEles.length; i++) {
        if (!passedExperienceH1) {
            passedExperienceH1 = allEles[i] === experienceH1;
            continue;
        }

        if (allEles[i].parentNode !== document.body) {
            continue;
        }

        if (allEles[i].tagName.toLowerCase() === 'h2') {
            groupIndex = (groupIndex===null) ? 0 : groupIndex + 1;
            groups[groupIndex] = [];
        }

        if (allEles[i].tagName.toLowerCase() === 'h1') {
            // Reached next heading.
            break;
        }

        groups[groupIndex].push(allEles[i]);
    }

    for (var j=0; j<groups.length; j++) {
        var group = document.createElement('div');
        group.setAttribute('className', 'experience-container');
        group.setAttribute('class', 'experience-container');

        document.body.insertBefore(group, groups[j][0]);
        for (var k=0; k<groups[j].length; k++) {
            group.appendChild(groups[j][k]);
        }
    }
})();

// Group references.
(function() {
    var allEles = document.body.getElementsByTagName('*');
    var referencesH1 = document.getElementsByClassName('references')[0];
    var passedReferencesH1 = false;
    var pCount = 0;
    var groups = [];
    var groupEles = [];
    var group, groupEle;
    for (i=0; i<allEles.length; i++) {
        if (!passedReferencesH1) {
            passedReferencesH1 = allEles[i] === referencesH1;
            continue;
        }

        if (allEles[i].parentNode !== document.body) {
            continue;
        }
        
        // Group every 3 p tags.
        if (allEles[i].tagName.toLowerCase() === 'p') {
            if (pCount % 3 === 0) {
                group = [];
                groups.push(group);
            }

            group.push(allEles[i]);
            pCount ++;
        }
    }

    for (var j=0; j<groups.length; j++) {
        groupEle = document.createElement('div');
        groupEle.setAttribute('className', 'reference-container');
        groupEle.setAttribute('class', 'reference-container');
        groupEles.push(groupEle);

        document.body.insertBefore(groupEle, groups[j][0]);
        for (var k=0; k<groups[j].length; k++) {
            groupEle.appendChild(groups[j][k]);
        }
    }

    // put them in a larger container.
    var container = document.createElement('div');
    container.setAttribute('className', 'references-container');
    container.setAttribute('class', 'references-container');
    document.body.insertBefore(container, groupEles[0]);

    for (var x=0; x<groupEles.length; x++) {
        container.appendChild(groupEles[x]);
    }
})();

// Mailto link on email.
(function() {
    var bodyHtml = document.body.innerHTML;
    document.body.innerHTML = bodyHtml.replace(
        /ben@sorohan.com.au/,
        '<a href="mailto:ben@sorohan.com.au">ben@sorohan.com.au<\/a>'
    );
})();
