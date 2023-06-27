export const getError = (error) => {
    return error.response && error.response.data.message
    ? error.response.data.message : error.message;
};


export function ToChineseName(categoryProduct) {
    switch (categoryProduct) {
        
        case 'IndustrialLubricants':
            return  "工業用潤滑油";
        
        case 'AutomotiveLubricants':
            return "車用齒輪油";
        
        case 'MarineLubrication':
            return "船舶用潤滑油";
        
        case 'FoodMachineryOil':
            return "食品機械用油";
        
        case 'MetalProcessingOil':
            return "金屬加工油";
        
        case 'Grease':
            return "潤滑油脂";
        
        default:
            return "工業用潤滑油";
    }
};

export function ToEnglishName (categoryProduct)  {
            switch (categoryProduct) {                   //此段是為了提交的時候獲取select.value並把中文轉成英文
            case '工業用潤滑油':
                return 'IndustrialLubricants'     
        
            case '車用齒輪油':
                return "AutomotiveLubricants"
            
            case '船舶用潤滑油':
                return "MarineLubrication"
            
            case '食品機械用油':
                return "FoodMachineryOil"
            
            case '金屬加工用油':
                return "MetalProcessingOil"
            
            case '潤滑油脂':
                return "Grease"
            
            default: 
                return 'IndustrialLubricants'  
        }
};