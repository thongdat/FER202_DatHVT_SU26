function Subject(){
    //Khai báo mảng chứa tên các môn học: React, React Native, NodeJS, ExpressJS, MongoDB
    const subjects = ['React', 'React Native', 'NodeJS', 'ExpressJS', 'MongoDB'];       
    return(
        <>
            <h1>Course name</h1>
            <ul>
                {subjects.map((subject, index) => (
                    <li key={index}>{subject}</li>
                ))}
            </ul>
            
        </>
    )
}

export default Subject; 