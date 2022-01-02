//
// Created by b8313 on 2022/1/2.
//

#include "fork.h"

#include <unistd.h>
#include <stdio.h>


int main(){
    // 创建进程
    pid_t pid = fork();

    // 判断当前进程是父进程 还是子进程
    if (pid > 0){			// 进程号 > 0，即为子进程的进程号，当前为父进程
        printf("pid: %d\n", pid);
        printf("I am parent process, pid: %d, ppid: %d\n", getpid(), getppid());
    }
    else if (pid == 0){		// 进程号 == 0，表示当前为子进程
        printf("I am child process, pid: %d, ppid: %d\n", getpid(), getppid());
    }

    for (int i = 0; i < 5; i++){
        printf("pid: %d, i : %d\n", getpid(), i);
        sleep(1);
    }
    return 0;
}

