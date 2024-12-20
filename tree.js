const readlineSync = require('readline-sync');

class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

function buildTree(preorder, inorder) {
    // 如果遍歷結果為空，直接返回 null
    if (preorder.length === 0 || inorder.length === 0) {
        return null;
    }

    const rootValue = preorder[0];
    const root = new TreeNode(rootValue);

    // 確認根節點是否存在於中序遍歷中
    const rootIndexInorder = inorder.indexOf(rootValue);
    if (rootIndexInorder === -1) {
        throw new Error(`Value ${rootValue} not found in inorder traversal.`);
    }

    // 分割左子樹和右子樹
    const leftInorder = inorder.slice(0, rootIndexInorder);
    const rightInorder = inorder.slice(rootIndexInorder + 1);

    const leftPreorder = preorder.filter((value) => leftInorder.includes(value));
    const rightPreorder = preorder.filter((value) => rightInorder.includes(value));

    root.left = buildTree(leftPreorder, leftInorder);
    root.right = buildTree(rightPreorder, rightInorder);

    return root;
}

function printTree(root) {
    if (root === null) {
        return;
    }

    console.log(root.value);
    printTree(root.left);
    printTree(root.right);
}

function getUserInput() {
    while (true) {
        const preorderInput = readlineSync.question('preorder is: ');
        const inorderInput = readlineSync.question('inorder is: ');

        const preorder = preorderInput ? Array.from(preorderInput).map(Number) : [];
        const inorder = inorderInput ? Array.from(inorderInput).map(Number) : [];

        // 驗證輸入
        if (inorder.length === 0) {
            console.log('Error: inorder traversal is required.\n');
            continue;
        }

        if (preorder.length === 0) {
            console.log('Error: preorder traversal is required.\n');
            continue;
        }

        if (preorder.length !== inorder.length || new Set(preorder).size !== new Set(inorder).size) {
            console.log('Error: Preorder and Inorder traversals must contain the same elements.\n');
            continue;
        }

        return { preorder, inorder };
    }
}

// 主邏輯
const { preorder, inorder } = getUserInput();

try {
    // 構建二元樹
    const root = buildTree(preorder, inorder);

    // 輸出二元樹的前序遍歷
    console.log('\nThe tree\'s preorder traversal is:');
    printTree(root);
} catch (err) {
    console.error(`\nError: ${err.message}`);
}

// 等待使用者按下 Enter
readlineSync.question('\nPress Enter to exit...');
