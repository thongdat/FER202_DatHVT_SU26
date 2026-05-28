//Tạo 1 list pff object chứa thông tin về người: id, name, age.
//Hiển thị thông tin của người dùng trong componenet People radangj danh sách
//có đánh số thứ tự, tên và tuổi của người dùng

function People() {
    const people = [
        { id: 1, name: 'Alice', age: 30 },
        { id: 2, name: 'Bob', age: 25 },
        { id: 3, name: 'Charlie', age: 35 },
        { id: 4, name: 'David', age: 28 },
        { id: 5, name: 'Eve', age: 22 }
    ];

    const searchName = 'Bob';
    const foundPerson = people.find(person => person.name === searchName);

    return (
        <>
            <h1>People List</h1>

            <p>Search result for <strong>{searchName}</strong>:</p>
            {foundPerson ? (
                <div>
                    Found: {foundPerson.name} - Age: {foundPerson.age}
                </div>
            ) : (
                <div>Not found</div>
            )}

            <ul>
                {people.map((person, index) => (
                    <li key={person.id}>
                        {index + 1}. {person.name} - Age: {person.age}
                    </li>
                ))}
            </ul>
        </>
    );
}

export default People;

