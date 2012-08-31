#include "device_control.h"
#include "TCPIP Stack/TCPIP.h"
int TimerInit(TIMERS_ID id, TMR_CLOCK_SOURCE source, TMR_GATED_MODE gated, TMR_PRESCALER pre, SYS_IDLE idle, TMR_BIT_MODE bit, TMR1_SYNC sync)
{
    WORD Config = 0;
    Config |= ((WORD)idle)   << 13;
    Config |= ((WORD)gated)  << 6;
    Config |= ((WORD)pre)    << 4;
    Config |= ((WORD)bit)    << 3;
    Config |= ((WORD)sync)   << 2;
    Config |= ((WORD)source) << 1;

    switch(id){
        case T1: T1CON = Config;
            break;
        case T2: T2CON = Config;
            break;
        case T3: T3CON = Config;
            break;
        case T4: T4CON = Config;
            break;
        case T5: T5CON = Config;
            break;
        case T6: T6CON = Config;
            break;
        case T7: T7CON = Config;
            break;
        case T8: T8CON = Config;
            break;
        case T9: T9CON = Config;
            break;
        default:
        return -1;
    }
    return 0;
}
int TimerSetInt(TIMERS_ID id, BYTE Level, BOOL enabled)
{
    switch(id){
        case T1:
            IPC0bits.T1IP = Level & 0x07;     // Set Timer1 Interrupt Priority Level
            IFS0bits.T1IF = 0;         // Clear Timer1 Interrupt Flag
            IEC0bits.T1IE = enabled;   // Enable Timer1 interrupt
            break;
        case T2:
            IPC1bits.T2IP = Level & 0x07;     // Set Timer2 Interrupt Priority Level
            IFS0bits.T2IF = 0;         // Clear Timer2 Interrupt Flag
            IEC0bits.T2IE = enabled;   // Enable Timer2 interrupt
            break;
        case T3:
            IPC2bits.T3IP = Level & 0x07;     // Set Timer3 Interrupt Priority Level
            IFS0bits.T3IF = 0;         // Clear Timer3 Interrupt Flag
            IEC0bits.T3IE = enabled;   // Enable Timer3 interrupt
            break;
        case T4:
            IPC6bits.T4IP = Level & 0x07;     // Set Timer4 Interrupt Priority Level
            IFS1bits.T4IF = 0;         // Clear Timer4 Interrupt Flag
            IEC1bits.T4IE = enabled;   // Enable Timer4 interrupt
            break;
        case T5:
            IPC7bits.T5IP = Level & 0x07;     // Set Timer5 Interrupt Priority Level
            IFS1bits.T5IF = 0;         // Clear Timer5 Interrupt Flag
            IEC1bits.T5IE = enabled;   // Enable Timer5 interrupt
            break;
        case T6:
            IPC11bits.T6IP = Level & 0x07;     // Set Timer6 Interrupt Priority Level
            IFS2bits.T6IF = 0;         // Clear Timer6 Interrupt Flag
            IEC2bits.T6IE = enabled;   // Enable Timer6 interrupt
            break;
        case T7:
            IPC12bits.T7IP = Level & 0x07;     // Set Timer7 Interrupt Priority Level
            IFS3bits.T7IF = 0;         // Clear Timer7 Interrupt Flag
            IEC3bits.T7IE = enabled;   // Enable Timer7 interrupt
            break;
        case T8:
            IPC12bits.T8IP = Level & 0x07;     // Set Timer8 Interrupt Priority Level
            IFS3bits.T8IF = 0;         // Clear Timer8 Interrupt Flag
            IEC3bits.T8IE = enabled;   // Enable Timer8 interrupt
            break;
        case T9:
            IPC13bits.T9IP = Level & 0x07;     // Set Timer9 Interrupt Priority Level
            IFS3bits.T9IF = 0;         // Clear Timer9 Interrupt Flag
            IEC3bits.T9IE = enabled;   // Enable Timer9 interrupt
            break;
        default:
        return -1;
    }
    return 0;
}
int TimerSetValue(TIMERS_ID id, WORD TmrValue, WORD PRValue)
{
    switch(id){
        case T1:
            TMR1 = TmrValue;
            PR1  = PRValue;
            break;
        case T2:
            TMR2 = TmrValue;
            PR2  = PRValue;
            break;
        case T3:
            TMR3 = TmrValue;
            PR3  = PRValue;
            break;
        case T4:
            TMR4 = TmrValue;
            PR4  = PRValue;
            break;
        case T5:
            TMR5 = TmrValue;
            PR5  = PRValue;
            break;
        case T6:
            TMR6 = TmrValue;
            PR6  = PRValue;
            break;
        case T7:
            TMR7 = TmrValue;
            PR7  = PRValue;
            break;
        case T8:
            TMR8 = TmrValue;
            PR8  = PRValue;
            break;
        case T9:
            TMR9 = TmrValue;
            PR9  = PRValue;
            break;
        default:
        return -1;
    }
    return 0;
}
int TimerSetState(TIMERS_ID id, BOOL enabled)
{

    switch(id){
        case T1: T1CONbits.TON = enabled;
            break;
        case T2: T2CONbits.TON = enabled;
            break;
        case T3: T3CONbits.TON = enabled;
            break;
        case T4: T4CONbits.TON = enabled;
            break;
        case T5: T5CONbits.TON = enabled;
            break;
        case T6: T6CONbits.TON = enabled;
            break;
        case T7: T7CONbits.TON = enabled;
            break;
        case T8: T8CONbits.TON = enabled;
            break;
        case T9: T9CONbits.TON = enabled;
            break;
        default:
        return -1;
    }
    return 0;
}

int DMAInit(DMA_ID id, DMA_DATA_SIZE_BIT size, DMA_TRANSFER_DIRECTION dir, DMA_COMPLETE_BLOCK_INT half, DMA_NULL_DATA_MODE nullw, DMA_ADRESING_MODE addr, DMA_OPERATION_MODE mode)
{
    WORD Config = 0;
    Config |= ((WORD)size)  << 14;
    Config |= ((WORD)dir)   << 13;
    Config |= ((WORD)half)  << 12;
    Config |= ((WORD)nullw) << 11;
    Config |= ((WORD)addr)  << 4;
    Config |= ((WORD)mode)  << 0;

    switch(id){
        case DMA0: DMA0CON = Config;
            break;
        case DMA1: DMA1CON = Config;
            break;
        case DMA2: DMA2CON = Config;
            break;
        case DMA3: DMA3CON = Config;
            break;
        case DMA4: DMA4CON = Config;
            break;
        case DMA5: DMA5CON = Config;
            break;
        case DMA6: DMA6CON = Config;
            break;
        case DMA7: DMA7CON = Config;
            break;
        default:
        return -1;
    }
    return 0;
}
int DMASelectDevice(DMA_ID id, DMA_DEVICE_IRQ irq, int DEVICE_REG)
{
    switch(id){
        case DMA0:
            DMA0REQ = (BYTE)irq;
            DMA0PAD = DEVICE_REG;
            break;
        case DMA1:
            DMA1REQ = (BYTE)irq;
            DMA1PAD = DEVICE_REG;
            break;
        case DMA2:
            DMA2REQ = (BYTE)irq;
            DMA2PAD = DEVICE_REG;
            break;
        case DMA3:
            DMA3REQ = (BYTE)irq;
            DMA3PAD = DEVICE_REG;
            break;
        case DMA4:
            DMA4REQ = (BYTE)irq;
            DMA4PAD = DEVICE_REG;
            break;
        case DMA5:
            DMA5REQ = (BYTE)irq;
            DMA5PAD = DEVICE_REG;
            break;
        case DMA6:
            DMA6REQ = (BYTE)irq;
            DMA6PAD = DEVICE_REG;
            break;
        case DMA7:
            DMA7REQ = (BYTE)irq;
            DMA7PAD = DEVICE_REG;
            break;
        default:
        return -1;
    }
    return 0;
}
int DMASelectBuffer(DMA_ID id, int DMAbufA, int DMAbufB, WORD Count)
{
     switch(id){
        case DMA0:
            DMA0STA = DMAbufA;
            DMA0STB = DMAbufB;
            DMA0CNT = Count;
            break;
        case DMA1:
            DMA1STA = DMAbufA;
            DMA1STB = DMAbufB;
            DMA1CNT = Count;
            break;
        case DMA2:
            DMA2STA = DMAbufA;
            DMA2STB = DMAbufB;
            DMA2CNT = Count;
            break;
        case DMA3:
            DMA3STA = DMAbufA;
            DMA3STB = DMAbufB;
            DMA3CNT = Count;
            break;
        case DMA4:
            DMA4STA = DMAbufA;
            DMA4STB = DMAbufB;
            DMA4CNT = Count;
            break;
        case DMA5:
            DMA5STA = DMAbufA;
            DMA5STB = DMAbufB;
            DMA5CNT = Count;
            break;
        case DMA6:
            DMA6STA = DMAbufA;
            DMA6STB = DMAbufB;
            DMA6CNT = Count;
            break;
        case DMA7:
            DMA7STA = DMAbufA;
            DMA7STB = DMAbufB;
            DMA7CNT = Count;
            break;
        default:
        return -1;
    }
    return 0;
}
int DMASetState(DMA_ID id, BOOL enabled, BOOL force)
{
    switch(id){
        case DMA0:
            DMA0CONbits.CHEN = enabled;
            DMA0REQbits.FORCE = force;
            break;
        case DMA1:
            DMA1CONbits.CHEN = enabled;
            DMA1REQbits.FORCE = force;
            break;
        case DMA2:
            DMA2CONbits.CHEN = enabled;
            DMA2REQbits.FORCE = force;
            break;
        case DMA3:
            DMA3CONbits.CHEN = enabled;
            DMA3REQbits.FORCE = force;
            break;
        case DMA4:
            DMA4CONbits.CHEN = enabled;
            DMA4REQbits.FORCE = force;
            break;
        case DMA5:
            DMA5CONbits.CHEN = enabled;
            DMA5REQbits.FORCE = force;
            break;
        case DMA6:
            DMA6CONbits.CHEN = enabled;
            DMA6REQbits.FORCE = force;
            break;
        case DMA7:
            DMA7CONbits.CHEN = enabled;
            DMA7REQbits.FORCE = force;
            break;
        default:
        return -1;
    }
    return 0;
}
int DMAGetPPState(DMA_ID id)
{
    int state = 0;
    switch(id){
        case DMA0: state = DMACS1bits.PPST0;
            break;
        case DMA1: state = DMACS1bits.PPST1;
            break;
        case DMA2: state = DMACS1bits.PPST2;
            break;
        case DMA3: state = DMACS1bits.PPST3;
            break;
        case DMA4: state = DMACS1bits.PPST4;
            break;
        case DMA5: state = DMACS1bits.PPST5;
            break;
        case DMA6: state = DMACS1bits.PPST6;
            break;
        case DMA7: state = DMACS1bits.PPST7;
            break;
        default:
        return -1;
    }
    return state;
}

int DMASetInt(DMA_ID id, BYTE Level, BOOL enabled)
{
     switch(id){
        case DMA0:
            IFS0bits.DMA0IF = 0;    // Clear the DMA interrupt flag
            IEC0bits.DMA0IE = enabled;    // Enable DMA interrupt
            IPC1bits.DMA0IP = Level;
            break;
        case DMA1:
            IFS0bits.DMA1IF = 0;    // Clear the DMA interrupt flag
            IEC0bits.DMA1IE = enabled;    // Enable DMA interrupt
            IPC3bits.DMA1IP = Level;
            break;
        case DMA2:
            IFS1bits.DMA2IF = 0;    // Clear the DMA interrupt flag
            IEC1bits.DMA2IE = enabled;    // Enable DMA interrupt
            IPC6bits.DMA2IP = Level;
            break;
        case DMA3:
            IFS2bits.DMA3IF = 0;    // Clear the DMA interrupt flag
            IEC2bits.DMA3IE = enabled;    // Enable DMA interrupt
            IPC9bits.DMA3IP = Level;
            break;
        case DMA4:
            IFS2bits.DMA4IF = 0;    // Clear the DMA interrupt flag
            IEC2bits.DMA4IE = enabled;    // Enable DMA interrupt
            IPC11bits.DMA4IP = Level;
            break;
        case DMA5:
            IFS3bits.DMA5IF = 0;    // Clear the DMA interrupt flag
            IEC3bits.DMA5IE = enabled;    // Enable DMA interrupt
            IPC15bits.DMA5IP = Level;
            break;
        case DMA6:
            IFS4bits.DMA6IF = 0;    // Clear the DMA interrupt flag
            IEC4bits.DMA6IE = enabled;    // Enable DMA interrupt
            IPC17bits.DMA6IP = Level;
            break;
        case DMA7:
            IFS4bits.DMA7IF = 0;    // Clear the DMA interrupt flag
            IEC4bits.DMA7IE = enabled;    // Enable DMA interrupt
            IPC17bits.DMA7IP = Level;
            break;
        default:
        return -1;
    }
    return 0;
}
int OCInit(OC_ID id, SYS_IDLE idle, OC_TMR_SELECT tmr, OC_WORK_MODE ocm)
{
    WORD Config = 0;
    Config |= ((WORD)idle)  << 13;
    Config |= ((WORD)tmr)   << 3;
    Config |= ((WORD)ocm)   << 0;
    switch(id){
        case ID_OC1: OC1CON = Config;
            break;
        case ID_OC2: OC2CON = Config;
            break;
        case ID_OC3: OC3CON = Config;
            break;
        case ID_OC4: OC4CON = Config;
            break;
        case ID_OC5: OC5CON = Config;
            break;
        case ID_OC6: OC6CON = Config;
            break;
        case ID_OC7: OC7CON = Config;
            break;
        case ID_OC8: OC8CON = Config;
            break;
        default:
        return -1;
    }
    return 0;
}
int OCSetValue(OC_ID id, WORD ocr, WORD ocrs)
{
    switch(id){
        case ID_OC1:
            OC1R  = ocr;
            OC1RS = ocrs;
            break;
        case ID_OC2:
            OC2R  = ocr;
            OC2RS = ocrs;
            break;
        case ID_OC3:
            OC3R  = ocr;
            OC3RS = ocrs;
            break;
        case ID_OC4:
            OC4R  = ocr;
            OC4RS = ocrs;
            break;
        case ID_OC5:
            OC5R  = ocr;
            OC5RS = ocrs;
            break;
        case ID_OC6:
            OC6R  = ocr;
            OC6RS = ocrs;
            break;
        case ID_OC7:
            OC7R  = ocr;
            OC7RS = ocrs;
            break;
        case ID_OC8:
            OC8R  = ocr;
            OC8RS = ocrs;
            break;
        default:
        return -1;
    }
    return 0;
}
int OCSetInt(OC_ID id, BYTE Level, BOOL enabled)
{
    switch(id){
        case ID_OC1:
            IPC0bits.OC1IP = Level;             // выбрать приоритет прерывания для OC1
            IFS0bits.OC1IF = 0;                 // сбросить флаг прерывания
            IEC0bits.OC1IE = enabled;           // разрешаем прерывания от OC1
            break;
        case ID_OC2:
            IPC1bits.OC2IP = Level;             // выбрать приоритет прерывания для OC2
            IFS0bits.OC2IF = 0;                 // сбросить флаг прерывания
            IEC0bits.OC2IE = enabled;           // разрешаем прерывания от OC2
            break;
        case ID_OC3:
            IPC6bits.OC3IP = Level;             // выбрать приоритет прерывания для OC3
            IFS1bits.OC3IF = 0;                 // сбросить флаг прерывания
            IEC1bits.OC3IE = enabled;           // разрешаем прерывания от OC3
            break;
        case ID_OC4:
            IPC6bits.OC4IP = Level;             // выбрать приоритет прерывания для OC4
            IFS1bits.OC4IF = 0;                 // сбросить флаг прерывания
            IEC1bits.OC4IE = enabled;           // разрешаем прерывания от OC4
            break;
        case ID_OC5:
            IPC10bits.OC5IP = Level;             // выбрать приоритет прерывания для OC5
            IFS2bits.OC5IF = 0;                 // сбросить флаг прерывания
            IEC2bits.OC5IE = enabled;           // разрешаем прерывания от OC5
            break;
        case ID_OC6:
            IPC10bits.OC6IP = Level;             // выбрать приоритет прерывания для OC6
            IFS2bits.OC6IF = 0;                 // сбросить флаг прерывания
            IEC2bits.OC6IE = enabled;           // разрешаем прерывания от OC6
            break;
        case ID_OC7:
            IPC10bits.OC7IP = Level;             // выбрать приоритет прерывания для OC7
            IFS2bits.OC7IF = 0;                 // сбросить флаг прерывания
            IEC2bits.OC7IE = enabled;           // разрешаем прерывания от OC7
            break;
        case ID_OC8:
            IPC11bits.OC8IP = Level;             // выбрать приоритет прерывания для OC8
            IFS2bits.OC8IF = 0;                 // сбросить флаг прерывания
            IEC2bits.OC8IE = enabled;           // разрешаем прерывания от OC8
            break;
        default:
        return -1;
    }
    return 0;
}

int OCSetMode(OC_ID id,OC_WORK_MODE ocm)
{
    switch(id){
        case ID_OC1: OC1CONbits.OCM = (BYTE)ocm;
            break;
        case ID_OC2: OC2CONbits.OCM = (BYTE)ocm;
            break;
        case ID_OC3: OC3CONbits.OCM = (BYTE)ocm;
            break;
        case ID_OC4: OC4CONbits.OCM = (BYTE)ocm;
            break;
        case ID_OC5: OC5CONbits.OCM = (BYTE)ocm;
            break;
        case ID_OC6: OC6CONbits.OCM = (BYTE)ocm;
            break;
        case ID_OC7: OC7CONbits.OCM = (BYTE)ocm;
            break;
        case ID_OC8: OC8CONbits.OCM = (BYTE)ocm;
            break;
        default:
        return -1;
    }
    return 0;
}


