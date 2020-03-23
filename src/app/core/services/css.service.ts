import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as $ from 'jquery';
//import { CelluleModel } from '../models/cellule.model';

@Injectable()
export class CssService {

  private unSelect = new Subject<any>();
  unSelect$ = this.unSelect.asObservable();

  constructor() {}

  /**
   * Stylise the building depending on the menu mode ( 0 => surface, 1 => occupant, 2 => propriétés)
   * @param {number} index the value can have 0, 1, 2 depends to menu mode
   */
  public styliserBuildingMode(index = 0) {
      let childOffset = {top: null, left: null};
      const $kind = $('.step .kind');
      const $owner = $('.step .owner');
      const $occupant = $('.step .occupant');
      const $offer = $('.step .offer');
      $('.selected.step__dropzone').removeClass('selected');
      let menuMode = 'kind';
      switch (index) {
        case 0 :
          menuMode = 'kind';
          
          $kind.css({'position': "static"});
          $kind.removeClass('inactive').css('left', 'inherit');
  
          for (let i = 0; i < $owner.length; i++) {
            childOffset = this.calculPosRelativeToParent($owner.eq(i));
            $owner.eq(i).css({left: childOffset.left});
          }
  
          for (let i = 0; i < $occupant.length; i++) {
            childOffset = this.calculPosRelativeToParent($occupant.eq(i));
            $occupant.eq(i).css({left: childOffset.left});
          }
          $owner.addClass('inactive');
          $occupant.addClass('inactive');
          $kind.css({'position': "relative"});
          break;
  
        case 2 :
          menuMode = 'owner';
          $kind.css({'position': "static"});
          $owner.removeClass('inactive').css('left', 'inherit');
  
          for (let i = 0; i < $kind.length; i++) {
            childOffset = this.calculPosRelativeToParent($kind.eq(i));
            $kind.eq(i).css({left: childOffset.left});
          }
  
          for (let i = 0; i < $occupant.length; i++) {
            childOffset = this.calculPosRelativeToParent($occupant.eq(i));
            $occupant.eq(i).css({left: childOffset.left});
          }
          $kind.addClass('inactive');
          $kind.css({'position': "absolute"});
          $occupant.addClass('inactive');
          break;
  
        case 1 :
          menuMode = 'occupant';
          $kind.css({'position': "static"});
          $occupant.removeClass('inactive').css('left', 'inherit');
  
          for (let i = 0; i < $owner.length; i++) {
            childOffset = this.calculPosRelativeToParent($owner.eq(i));
            $owner.eq(i).css({left: childOffset.left});
          }
  
          for (let i = 0; i < $kind.length; i++) {
            childOffset = this.calculPosRelativeToParent($kind.eq(i));
            $kind.eq(i).css({left: childOffset.left});
          }
          $kind.addClass('inactive');
          $kind.css({'position': "absolute"});
          $owner.addClass('inactive');
          break;

          case 3 :
            menuMode = 'offer';
            $kind.css({'position': "static"});
            $offer.removeClass('inactive').css('left', 'inherit');
    
            for (let i = 0; i < $owner.length; i++) {
              childOffset = this.calculPosRelativeToParent($owner.eq(i));
              $owner.eq(i).css({left: childOffset.left});
            }
    
            for (let i = 0; i < $kind.length; i++) {
              childOffset = this.calculPosRelativeToParent($kind.eq(i));
              $kind.eq(i).css({left: childOffset.left});
            }
            for (let i = 0; i < $occupant.length; i++) {
              childOffset = this.calculPosRelativeToParent($occupant.eq(i));
              $occupant.eq(i).css({left: childOffset.left});
            }
            $kind.addClass('inactive');
            $kind.css({'position': "absolute"});
            $owner.addClass('inactive');
            $occupant.addClass('inactive');
            break;
      }
      return menuMode;
  }

  /**
   * 
   * @param jQueryElem 
   */
  private calculPosRelativeToParent(jQueryElem) {
    const childPos = jQueryElem.offset();
    const parentPos = jQueryElem.parent().offset();
    const index = jQueryElem.parent().children().index(jQueryElem);

      if (jQueryElem.length) {
        if(childPos.left === 0) {
         
          let sumWidth = 0;
          for (let i = 1; i < index; i++) {
            sumWidth += jQueryElem.parent().children().eq(i).width();
          }
          return {
            top: childPos.top - parentPos.top,
            left: sumWidth+"%"
          };
        }
        return {
            top: childPos.top - parentPos.top,
            left: childPos.left - parentPos.left-1
        };
      }
      return {
        top: 0,
        left: 0
      };
  }

  /**
   * To align the first floor between building
   */
  public setSizeUnderground() {
    /* const $plan = $('.plan');
    $('.building_steps.underground').height('auto');
    for(let j = 0; j < $plan.length; j++) {
      const $underground = $plan.eq(j).find('.building_steps.underground');
      let undergroundMaxSize = 0;
      for(let i =0; i < $underground.length; i++) {
        debugger;
        let size = $underground.eq(i).height();
        undergroundMaxSize = size > undergroundMaxSize ? size : undergroundMaxSize;
      }
      $underground.height(undergroundMaxSize);
    } */
    return $('.building_steps.underground .stepContainer').height();
  }

  public setUndergroundHeight() {
    const $plan = $('.plan');
    $('.building_steps.underground').height('auto');

    for(let j = 0; j < $plan.length; j++) {
      const $underground = $plan.eq(j).find('.building_steps.underground');
      let undergroundMaxSize = 0;
      for(let i =0; i < $underground.length; i++) {
        let size = $underground.eq(i).height();
        undergroundMaxSize = size > undergroundMaxSize ? size : undergroundMaxSize;
      }
      $underground.height(undergroundMaxSize);
    }
  }

  /** to remove all selection */
  public unSelectAll() {
    this.unselect();
  }

  public unselect() {
    this.unSelect.next();
  }

  /**
   * generate a random color
   * @param str 
   */
  public stringToColor(str) {
    var arr1 = [];
    for (var n = 0, l = str.length; n < l; n ++) {
      var hex = Number(str.charCodeAt(n)).toString(16);
      arr1.push(hex);
    }
    let color = '#D' + arr1.join('').slice(-4) + "F";
    return color ;
  }
    

}
