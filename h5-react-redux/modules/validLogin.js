import validate from '../lib/vera/util/validate'
import clearSpace from '../lib/vera/util/clearSpace'

export function validEmpty(list){
	for(var i=0; i<list.length; i++){
            var item = list[i];
            var _result = validate.notEmpty(item.val).result;
            if(!_result){
                //查到有空值
                return {
                    result:false,
                    msg: item.tip
                };
            }
        }
        return {
            result:true,
            msg:''
        };
}

export function validCharactors(val){
    return (/\。/g).test(val)||
           (/\，/g).test(val)||
           (/\_/g).test(val)||
           (/\-/g).test(val)||
           (/\./g).test(val)||
           (/\,/g).test(val)||
           (/\、/g).test(val)||
           (/\ /g).test(val);
}

export function validNameBankcardSubBank(fullname, bankcard, subbank){
    var result = {};
    var validFullname = validate.fullname(fullname);
    var validBankcard = validate.bankcardNo(bankcard);
    var validSubbank = validate.notEmpty(subbank);
    result.result = validBankcard.result&&
                    validFullname.result&&
                    validSubbank.result;
    if(result.result)
    {
        result.msg = "";
        return result;
    }
    if(!validBankcard.result){
        result.msg = validBankcard.msg;
        return result;
    }
    if(!validFullname.result){
        result.msg = validFullname.msg;
        return result;
    }
    if(!validSubbank.result){
        result.msg = validSubbank.msg;
        return result;
    }
}
export function validNBEmpty(fullname, pwd){
    var validFullname = validate.lenMN(fullname, 2, 20).result;
    var validBankcard = validate.notEmpty(pwd).result;
    console.log(validFullname, validBankcard);
    return validFullname&&validBankcard;
}
export function validAllEmpty(fullname, bankcard, bank, province, city, subbank){
    var validFullname = validate.lenMN(fullname, 2, 20).result;
    var validBankcard = validate.notEmpty(bankcard).result;
    var validBank = validate.notEmpty(bank).result;
    var validProvince = validate.notEmpty(province).result;
    var validCity = validate.notEmpty(city).result;
    var validSubbank = validate.notEmpty(subbank).result;
    return validFullname&&validBankcard&&validBank&&validProvince&&validCity&&validSubbank;
}
export function validBankNo(bankcard){
    return validate.bankcardNo(bankcard);
}
export function validCardbin(bank, cardbin){
    var result = {};
    var validCardbin = cardbin.isMakeOut;
    var validCardbinCreditCard = validCreditCard(cardbin.cardType);
    var validCardbinSupport = validSupported(cardbin.isSupported,cardbin.bankName);
    var validCardbinBankCodeEqual = validBankEqual(bank, cardbin.bankCode);
    if(validCardbin){
        result.result = validCardbinCreditCard.result&&
                        validCardbinSupport.result&&
                        validCardbinBankCodeEqual.result;
    }else{
        return{result:true, msg:""};
    }
    
    if(result.result)
    {
        result.msg = "";
        return result;
    }
    if(!validCardbinCreditCard.result){
        result.msg = validCardbinCreditCard.msg;
        return result;
    }
    if(!validCardbinSupport.result){
        result.msg = validCardbinSupport.msg;
        return result;
    }
    if(!validCardbinBankCodeEqual.result){
        result.msg = validCardbinBankCodeEqual.msg;
        return result;
    }
}
export function validCardbinPrimary(cardbin){
    var result = {};
    var validCardbin = cardbin.isMakeOut == 1;
    var validCardbinCreditCard = validCreditCard(cardbin.cardType);
    var validCardbinSupport = validSupported(cardbin.isSupported,cardbin.bankName);
    if(validCardbin){
        result.result = validCardbinCreditCard.result&&
                        validCardbinSupport.result;
    }else{
        return{result:true, msg:""};
    }

    if(result.result)
    {
        result.msg = "";
        return result;
    }
    if(!validCardbinCreditCard.result){
        result.msg = validCardbinCreditCard.msg;
        return result;
    }
    if(!validCardbinSupport.result){
        result.msg = validCardbinSupport.msg;
        return result;
    }
}

function validCreditCard(type){
    if(type == 2){
        return {result:false, msg: "检测到你输入的是信用卡卡号，钱包提现仅支持提现到储蓄卡哦"}
    }
    return {result: true, msg: ""};
}

function validSupported(isSupported, bankName){
    if(isSupported == 0){
        return {result:false, msg: "检测到你输入的是"+bankName+"卡号，抱歉我们暂不支持提现到该银行"}
    }
    return {result: true, msg: ""};
}

function validBankEqual(bankCode, cardbinBankCode){
    if(bankCode != cardbinBankCode){
        return {result:false, msg: "0"}
    }
    return {result: true, msg: ""};
}

export function filterNotNumber(val){
    return val.replace(/[^\d]/g, '');
}
export function filterCharactor(val){
    return val.replace(/\。/g,'·')
              .replace(/\./g,'·')
              .replace(/\，/g,'·')
              .replace(/\_/g,'·')
              .replace(/\-/g,'·')
              .replace(/\,/g,'·')
              .replace(/\、/g,'·')
              .replace(/\ /g,'·');
}