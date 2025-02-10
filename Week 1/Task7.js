//Develop a program that highlights the differences in scoping between let and var. Create a block-scoped variable using let and a function-scoped variable using var. Attempt to access these variables outside their respective scopes and explain the results in the comments.

function LetVariable() {
    if (true) {
        let blockScoped = "I am block scoped";
        console.log(blockScoped); // This works
    }
    // console.log(blockScoped); // this line will throw error because blocked scope can't access outside the block.
    for (let j = 0; j < 3; j++) {
    console.log(j);
    }
    //console.log(j); // this line will throw error because J can't access outside of the block.
}

LetVariable();

function VarVariable() {
    if (true) {
        var functionScoped = "I am function scoped";
        console.log(functionScoped); // This works
    }
    console.log(functionScoped); // This also works because var is function-scoped, not block-scoped.

    for (var i = 0; i < 3; i++) {
    console.log(i);
    }
    console.log(i); // This works because var is not block-scoped, it is hoisted to the function or global scope

}
VarVariable();

