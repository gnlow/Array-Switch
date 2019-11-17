export default class Switchable {
    head: any[];
    branches: Switchable[];
    branchNumber: number;

    get currentBranch(): Switchable {
        return this.branches[this.branchNumber]
    }
    
    get data(): Array<any> {
        if(this.branchNumber != undefined){
            return this.head.concat(this.currentBranch.data);
        }else{
            return this.head;
        }
    }
    set data(value: Array<any>) {
        value.forEach((item, index) => this.change(index, item));
        this.cut(value.length);
    }
    constructor(init: any[]){
        this.head = init;
        this.branches = [];
    }

    isInHead(index: number): boolean{
        return index < this.head.length;
    }
    branchAction<T>(index: number, action: (branch: Switchable, index: number, ...option: any) => T, ...option: any): T{
        if(this.isInHead(index)){
            return action(this, index, ...option);
        }else{
            return this.currentBranch.branchAction(index - this.head.length, action, ...option);
        }
    }
    static branch(branch: Switchable, index: number){
        branch.branches.push(new Switchable(branch.head.slice(index, branch.head.length)));
        branch.head = branch.head.slice(0, index);
        branch.branchNumber = 0;
        return branch;
    }
    static stick(branch: Switchable, index: number, data: any[]){
        if(branch.head.length == index + 1 && branch.branches.length){
            branch.branches.push(new Switchable(data));
            return branch;
        }else{
            var newBranch = branch.branch(index + 1);
            newBranch.branches.push(new Switchable(data));
            return newBranch;
        }
    }
    static change(branch: Switchable, index: number, data: any){
        branch.head[index] = data;
        return branch;
    }
    static cut(branch: Switchable, index: number){
        branch.head.splice(index, branch.head.length - index);
        branch.branches = [];
        return branch;
    }
    static select(branch: Switchable, index: number){
        return branch;
    }
    branch(index: number){
        return this.branchAction(index, Switchable.branch);
    }
    stick(index: number, data: any[]){
        return this.branchAction(index, Switchable.stick, data);
    }
    change(index: number, data: any){
        return this.branchAction(index, Switchable.change, data);
    }
    cut(index: number){
        return this.branchAction(index, Switchable.cut);
    }
    select(index: number){
        return this.branchAction(index, Switchable.select);
    }

    switch(branchNumber: number){
        this.branchNumber = branchNumber;
    }
}