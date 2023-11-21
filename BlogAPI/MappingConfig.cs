using AutoMapper;
using static Azure.Core.HttpHeader;

namespace Blog.API
{
    public class MappingConfig
    {
        public static MapperConfiguration RegisterMap()
        {
            var mappingConfig = new MapperConfiguration(config =>
            {
                
            });
            return mappingConfig;
        }
    }
}
