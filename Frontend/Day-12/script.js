var marks = 80

// if(marks>85){
//     console.log('A+');
// }else if(marks>75){
//     console.log('B+');
// }else if(marks>60){
//     console.log('C+');
// }else{
//     console.log('Fail');
// }

switch (true) {
    case (marks > 85):
        console.log('A+');
        break;
    case (marks > 75):
        console.log('B+')
        break;
    case (marks > 60):
        console.log('C+');
        break;
    default: console.log('Fail');
}