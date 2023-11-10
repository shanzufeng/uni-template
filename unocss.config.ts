// @ts-ignore
import presetWeapp from 'unocss-preset-weapp';
import { defineConfig, entriesToCss, presetUno } from 'unocss';
// @ts-ignore
import { transformerAttributify, transformerClass } from 'unocss-preset-weapp/transformer';
// @ts-ignore
import { theme } from '@unocss/preset-mini'

export default defineConfig({
  theme: {
    preflightBase: undefined,
  },
  preflights: [
    {
      getCSS() {
        const css = entriesToCss(Object.entries(theme.preflightBase))
        return `view,::before,::ofter{${css}}::backdrop{${css}}`
      }
    }
  ],
	// @ts-ignore
	presets: [presetWeapp(), presetUno()],
	rules: [
		['font-0', { 'font-size': '1.25rem' }],
		['font-1', { 'font-size': '1.13rem' }],
		['font-2', { 'font-size': '0.81rem' }],
		['font-3', { 'font-size': '0.75rem' }],
		['font-4', { 'font-size': '1.63rem' }],
		['font-5', { 'font-size': '1.25rem' }],
		['font-6', { 'font-size': '0.88rem' }],
		['font-7', { 'font-size': '0.94rem' }],
		['font-8', { 'font-size': '0.81rem' }],
		['font-9', { 'font-size': '1rem' }],
		['font-10', { 'font-size': '1.5rem' }],
		['font-11', { 'font-size': '1.38rem' }],
		['font-12', { 'font-size': '1.06rem' }],
		['linH-1', { 'line-height': '1.05rem !important' }],
		['color-1', { color: 'rgba(18, 18, 18, 1)' }],
		['color-2', { color: 'rgba(128, 128, 128, 1)' }],
		['color-3', { color: 'rgba(56, 56, 56, 1)' }],
		['color-4', { color: 'rgba(166, 166, 166, 1)' }],
		['color-5', { color: 'rgba(96, 118, 152, 1)' }],
		['color-6', { color: 'rgba(25, 46, 81, 1)' }],
		['color-7', { color: 'rgba(160, 128, 61, 1)' }],
		['color-8', { color: 'rgba(234, 96, 102, 1)' }],
		['color-9', { color: 'rgba(138, 138, 143, 1)' }],
		['color-10', { color: 'rgba(247, 210, 71, 1)' }],
		['color-11', { color: 'rgba(20, 20, 22, 1)' }],
		['color-12', { color: 'rgba(34, 38, 48, 1)' }],
		['color-13', { color: 'rgba(34, 34, 34, 1)' }],
		['color-14', { color: 'rgba(102, 102, 102, 1)' }],
		['bg-color-1', { 'background-color': 'rgba(250, 250, 250, 1)' }],
		['bg-color-2', { 'background-color': 'rgba(233, 233, 240, 1)' }],
		['bg-color-3', { 'background-color': 'rgba(247, 247, 247, 1)' }],
		['bg-color-4', { 'background-color': 'rgba(161, 24, 24, 1)' }],
		['bd-b-1', { 'border-bottom': '0.03rem solid rgba(238, 238, 238, 1)' }],
		['bd-b-2', { 'border-bottom': '0.06rem solid rgba(229, 229, 229, 1)' }],
		['bd-b-3', { 'border-bottom': '0.06rem solid rgba(216, 216, 216, 1)' }],
    ['bd-p-1', { 'border-top': '0.03rem solid rgba(238, 238, 238, 1)' }],
    ['bd-r-1', { 'border-right': '0.06rem solid rgba(216, 216, 216, 1)' }],
		['bd-all-1', { border: '0.06rem solid rgba(161, 24, 24, 1)' }],
    ['bd-all-2', { border: '0.06rem solid rgba(245, 246, 250, 1)' }],
    ['bd-all-3', { border: '0.06rem solid rgba(245, 246, 250, 1)' }],
		['width-full', { width: '750rpx' }],
		['-z-1', { 'z-index': '-1' }],
		[
			/^flexs-(\d+)$/,
			(match) => {
				const matchNum = parseInt(match[1]);
				return {
					flex: `${matchNum}`
				};
			}
		],
		[
			/^flexs-(\d+)-(\d+)-(\d+)$/,
			(match) => {
				const [, grow, shrink, basis] = match;
				return {
					flex: `${grow} ${shrink} ${basis}%`
				};
			}
		],
		// [
		// 	/^mbs-(\d+)$/,
		// 	(match) => {
		// 		const matchNum = parseInt(match[1]);
		// 		return {
		// 			'margin-bottom': `${matchNum}px`
		// 		};
		// 	}
		// ],
    [
      /^transforms_.+$/,
      (match) => {
        const [, x, y] = match[0].split('_');
        return {
          'transform': `translate(${x}, ${y})`
        };
      }
    ],
    [
      /^bgImg_.+$/,
      (match) => {
        const [, img, repeat, size] = match[0].split('_');
        return {
          'background-image': `url('/static/${img}.png')`,
          'background-repeat': repeat || 'no-repeat',
          'background-size': size || '100% 100%'
        };
      }
    ],
		[
			/^rounded_.+$/,
			(match) => {
				const [fonts, num1, _, num2] = match[0].split('_'); // parseInt(match[0].split('-')[1]);
				const isDecimal = Boolean(num1 && num2);
				return {
					'border-radius': `${isDecimal ? num1 + '.' + num2 : num1}rem`
				};
			}
		],
    [
      /^heightVh_.+$/,
      (match) => {
        const [fonts, num1, _, num2] = match[0].split('_'); // parseInt(match[0].split('-')[1]);
        const isDecimal = Boolean(num1 && num2);
        return {
          'height': `${isDecimal ? num1 + '.' + num2 : num1}vh`
        };
      }
    ],
		[
			/^fonts_.+$/,
			(match) => {
				const [fonts, num1, _, num2] = match[0].split('_'); // parseInt(match[0].split('-')[1]);
				const isDecimal = Boolean(num1 && num2);
				return {
					'font-size': `${isDecimal ? num1 + '.' + num2 : num1}rem`
				};
			}
		],
		[
			/^colors_.+$/,
			(match) => {
				const [colors, red, green, blue, opacity, drop, opacity1] = match[0].split('_');
				return {
					color: `rgba(${red}, ${green || red}, ${blue || red}, ${drop ? opacity + '.' + opacity1 : opacity || 1})`
				};
			}
		],
    [
      /^trsFom_.+$/,
      (match) => {
        const [_, x, y] = match[0].split('_');
        return {
          transform: x && y ? `translate(-${x}%, -${y}%)` : x ? `translateX(-${x}%)` : y ? `translateY(-${y}%)` : ''
        };
      }
    ],
		[
			/^bgColors_.+$/,
			(match) => {
				const [bgColors_, red, green, blue, opacity, drop, opacity1] = match[0].split('_');
				return {
					'background-color': `rgba(${red}, ${green || red}, ${blue || red}, ${drop ? opacity + '.' + opacity1 : opacity || 1})`
				};
			}
		],
    [
      /^safe-bottom.+$/,
      (match) => {
        const [, num] = match[0].split('_');
        return {
          'padding-bottom': 0,
          // @ts-ignore
          'padding-bottom': `calc(constant(safe-area-inset-bottom) + ${num}rem)`,
          // @ts-ignore
          'padding-bottom': `calc(env(safe-area-inset-bottom) + ${num}rem)`
        };
      }
    ],
		[
			/^wap_.+$/,
			(match) => {
				const [wap_, num] = match[0].split('_');
				return {
					overflow: 'hidden',
					'text-overflow': 'ellipsis',
					'-webkit-line-clamp': num,
					display: '-webkit-box',
					'-webkit-box-orient': 'vertical'
				};
			}
		]
	],
	shortcuts: [
		{
			'border-base': 'border border-gray-500_10',
			'flex-center': 'flex justify-center items-center',
			'flex-center1': 'flex items-center',
			'flex-center2': 'flex items-center justify-between',
			'flex-center3': 'flex items-center flex-col',
			'flex-center4': 'flex justify-between items-center',
			'flex-center5': 'flex justify-around items-center',
      'flex-center6': 'flex flex-col',
      'flex-center7': 'flex flex-col justify-between',
      'flex-center8': 'flex flex-col justify-around',
      'flex-start': 'flex items-start',
      'flex-end': 'flex items-end',
      'flex-end1': 'flex justify-end',
      'flex-warp1': 'flex flex-wrap items-center justify-start',
			'flex-between': 'flex justify-between',
			'fixed-1': 'fixed top-0 left-0',
      'fixed-2': 'fixed left-0 bottom-0',
			'absolute-1': 'absolute top-0 left-0',
      'absolute-2': 'absolute left-0 bottom-0',
      'absolute-3': 'absolute left-1/2 top-1/2',
      'absolute-4': 'absolute left-1/2 top-0',
			'bg-base': 'bg-#f6f7fb',
			'text-c1': 'color-#000/85',
			'text-c2': 'color-#000/65',
			'text-c3': 'color-#000/45',
			'text-c4': 'color-#000/25'
		}
	],
	transformers: [
		// @ts-ignore
		// https://github.com/MellowCo/unocss-preset-weapp/tree/main/src/transformer/transformerAttributify
		transformerAttributify(),
		// @ts-ignore
		// https://github.com/MellowCo/unocss-preset-weapp/tree/main/src/transformer/transformerClass
		transformerClass()
	]
});
