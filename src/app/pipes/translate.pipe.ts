export var messageBundle: any;
import { Pipe, PipeTransform, Inject } from "@angular/core";
import { TranslateService } from "../services/translate.service";

@Pipe({
  name: "translate",
  pure: false,
})
export class TranslatePipe implements PipeTransform {
  private request: any;

  constructor(
    @Inject(TranslateService) private _translateService: TranslateService
  ) {
    this._translateService = _translateService;
  }

  transform(value: string, gridCode? : string): any {

    let returnValue = gridCode  ?  this._translateService.messageBundle[gridCode][value] : this._translateService.messageBundle[value];
    return returnValue;
  }
}
