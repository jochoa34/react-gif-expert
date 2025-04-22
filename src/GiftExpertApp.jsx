import {useState, useEffect} from 'react';
import {AddCategory,GifGrid} from './components';

export const GiftExpertApp = () => {

    const [categories, setCategories] = useState(['One Punch']);
    const [isReadyForInstall, setIsReadyForInstall] = useState(false);

    const onAddCategory = (NewCategory) => {
        if (categories.includes(NewCategory)) 
            return;
        
        // console.log(NewCategory);
        setCategories([
            NewCategory,
            ...categories
        ]);
    }
    useEffect(() => {
      window.addEventListener('beforeinstallprompt', (e) => {
        //prevent the mini info bar from appearing on mobile
        e.preventDefault();
        console.log("breforeinstallprompt",e);
        // Stash the event so it can be triggered later.
        window.deferredPrompt = e;
        //remove de hidden class from the install button
        setIsReadyForInstall(true);
      });
    }, [])
    
    async function installPWA() {
        const promptEvent = window.deferredPrompt;
        if (!promptEvent) {
            console.log('No install prompt available');
            return;
        }
        // Show the install prompt
        promptEvent.prompt();
        // Wait for the user to respond to the prompt
        const  result  = await promptEvent.userChoice;
        console.log('User response to the install prompt:', result)
        // Clear the deferredPrompt so it can be garbage collected
        window.deferredPrompt = null;
        setIsReadyForInstall(false);
    }

    return (
        <> 
            <header className='header'>
            <h1>GifExpertApp</h1>
            <button onClick={installPWA} className='button'>descargar</button>
            
            </header>
            
            <AddCategory 
                onNewCategory={(value) =>onAddCategory(value)}
            /> 
            {
                categories.map((category) => (
                    <GifGrid 
                        key={category} 
                        category={category} />
                ))
            }   
        </>
    )
};
