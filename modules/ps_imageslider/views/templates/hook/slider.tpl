{**
 * 2007-2017 PrestaShop
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Academic Free License 3.0 (AFL-3.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/AFL-3.0
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
 * versions in the future. If you wish to customize PrestaShop for your
 * needs please refer to http://www.prestashop.com for more information.
 *
 * @author    PrestaShop SA <contact@prestashop.com>
 * @copyright 2007-2017 PrestaShop SA
 * @license   https://opensource.org/licenses/AFL-3.0 Academic Free License 3.0 (AFL-3.0)
 * International Registered Trademark & Property of PrestaShop SA
 *}

{if $homeslider.slides}
<div class="container">
  <div id="carousel" data-ride="carousel" class="carousel" data-interval="{$homeslider.speed}" data-wrap="{(string)$homeslider.wrap}" data-pause="{$homeslider.pause}">
    <ul class="carousel__inner" role="listbox">
      {foreach from=$homeslider.slides item=slide name='homeslider'}
        <li class="carousel-item {if $smarty.foreach.homeslider.first}carousel-item--active{/if}" role="option" aria-hidden="{if $smarty.foreach.homeslider.first}false{else}true{/if}">
            <figure class="carousel-item__container"> 
              <img src="{$slide.image_url}" alt="{$slide.legend|escape}" class="carousel-item__img">
              {if $slide.title || $slide.description}
                <figcaption class="caption carousel-item__content">
                  <h2 class="title--big carousel-item__title">{$slide.title}</h2>
                  <div class="caption-description carousel-item__description ">
                      {$slide.description nofilter}
                    <a href="{$slide.url}" class="btn btn--grey-orange margin-top-medium">En savoir plus</a>
                  </div>
                </figcaption>
              {/if}
            </figure>
        </li>
      {/foreach}
    </ul>
    <div class="direction" aria-label="{l s='Carousel buttons' d='Shop.Theme.Global'}">
      <a class="carousel__control carousel__control--left" href="#carousel" role="button" data-slide="prev">
        <span class="sr-only">{l s='Previous' d='Shop.Theme.Global'}</span>
      </a>
      <a class="carousel__control carousel__control--right" href="#carousel" role="button" data-slide="next">
          <span class="sr-only">{l s='Next' d='Shop.Theme.Global'}</span>
      </a>
    </div>
    <div class="carousel__pointer-container">
      {foreach from=$homeslider.slides item=slide name='homeslider'}
      <button class="carousel__pointer {if $smarty.foreach.homeslider.first}carousel__pointer--active{/if}"></button>
      {/foreach}
    </div>
  </div>
</div>
{/if}
