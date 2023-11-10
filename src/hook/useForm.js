import { ref, onMounted } from 'vue';
import { onReady } from '@dcloudio/uni-app';

const formInfo = (rules ={}) => {
	const formRef = ref(null);
    const setFormRule = (rule) => {
        formRef.value.setRules(rule || rules);
    }
	onReady(() => {
        setFormRule();
	});
    onMounted(()=>{
        setFormRule();
    })
	const validate = () => {
		return new Promise((resolve, reject) => {
			formRef.value.validate((valid) => {
				if (valid) {
					resolve();
				} else {
					reject();
				}
			});
		});
	};

	return {
        setFormRule,
		validate,
		formRef
	};
};

export { formInfo };
