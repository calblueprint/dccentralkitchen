const loremipsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer pretium, libero non varius pharetra, sem nibh sagittis ex, vel imperdiet';

function createCardData(subjectLine, date, body) {
    return {
        subjectLine: subjectLine,
        date: date,
        body: body
    }
}

export const DATA = [
    {
        title: 'Messages',
        data: [
            createCardData('Subject', '10/01/2019', loremipsum),
            createCardData('Subject', '10/01/2019', loremipsum),
            createCardData('Subject', '10/01/2019', loremipsum),
            createCardData('Subject', '10/01/2019', loremipsum),
            createCardData('Subject', '10/01/2019', loremipsum),
            createCardData('Subject', '10/01/2019', loremipsum)
        ]
    }
];
