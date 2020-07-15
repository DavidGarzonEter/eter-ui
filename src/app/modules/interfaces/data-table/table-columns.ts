export interface TableColumns {
    ID:String,
    label:String,
    type:String,
    paramsCombo?:{
        url?:String,
        visibleField?:String,
        selectionField?:String
    },
    style?:{
        width?:String,
        textAlign?:String,
        color?:String,
        backgroundColor?:String,
    }
}
