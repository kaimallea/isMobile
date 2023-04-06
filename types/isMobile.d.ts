export type UserAgent = string;
export type Navigator = {
    userAgent: string;
    platform: string;
    maxTouchPoints?: number;
};
export type UserAgentClientHints = {
    ua: string;
    uaMobile: boolean;
    uaPlatform: string;
    uaPlatformVersion: string;
};
export type isMobileResult = {
    apple: {
        phone: boolean;
        ipod: boolean;
        tablet: boolean;
        universal: boolean;
        device: boolean;
    };
    amazon: {
        phone: boolean;
        tablet: boolean;
        device: boolean;
    };
    android: {
        phone: boolean;
        tablet: boolean;
        device: boolean;
    };
    windows: {
        phone: boolean;
        tablet: boolean;
        device: boolean;
    };
    other: {
        blackberry: boolean;
        blackberry10: boolean;
        opera: boolean;
        firefox: boolean;
        chrome: boolean;
        clientHints: boolean;
        device: boolean;
    };
    phone: boolean;
    tablet: boolean;
    any: boolean;
};
export type IsMobileParameter = UserAgent | Navigator | UserAgentClientHints;
export default function isMobile(param?: IsMobileParameter): isMobileResult;
//# sourceMappingURL=isMobile.d.ts.map